from fastapi import APIRouter, Depends, HTTPException
from database.controller import insert_answer_into_task
from pydantic import BaseModel, ConfigDict
from deps import user_role


class TaskAnswerModel(BaseModel):
    task_id: int
    answer: str

    model_config = ConfigDict(from_attributes=True)


router = APIRouter()


@router.post("/answer")
async def answer_route(answer: TaskAnswerModel, role: str = Depends(user_role)):
    if role != "ROLE_USER":
        raise HTTPException(status_code=403, detail="Forbidden.")
    await insert_answer_into_task(task_id=answer.task_id, answer=answer.answer)
    return "OK"