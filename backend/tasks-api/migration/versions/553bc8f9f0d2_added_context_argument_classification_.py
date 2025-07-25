"""Added context argument classification to task category enum

Revision ID: 553bc8f9f0d2
Revises: 6cafffb02986
Create Date: 2025-07-08 19:47:29.078951

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '553bc8f9f0d2'
down_revision: Union[str, Sequence[str], None] = '6cafffb02986'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###
