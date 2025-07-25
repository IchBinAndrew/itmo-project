"""Added answers to tasks

Revision ID: a4ddbd6000e4
Revises: cbf5a84199f4
Create Date: 2025-07-14 00:20:53.079628

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a4ddbd6000e4'
down_revision: Union[str, Sequence[str], None] = 'cbf5a84199f4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('answer', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tasks', 'answer')
    # ### end Alembic commands ###
