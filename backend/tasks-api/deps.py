from jose import ExpiredSignatureError, jwt
from fastapi import Request, Header, HTTPException
from typing import Annotated
import httpx


AUTH_URL = "http://89.169.146.136:8765/users"

async def user_role(request: Request, authorization: str | None = Header(None)):
    token = request.cookies.get("token")
    if token:
        pass
    if not token and authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
    elif token is None:
        print("Token is None!")
        print(request.headers)
        print(authorization)
        # print(authorization.split(" "))
        raise HTTPException(status_code=401, detail="Not authenticated.")
    header = jwt.get_unverified_header(token)
    algorithm = header.get("alg")
    try:
        payload = jwt.decode(token, key=None, algorithms=[algorithm],
                            options={"verify_signature": False})
    except ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="Expired signature")
    username = payload["sub"]
    async with httpx.AsyncClient() as client:
        response = await client.get(url=f"{AUTH_URL}/role?username={username}",
                                    headers={
                                        "Authorization": f"Bearer {token}"
                                    })
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code)
        return response.text