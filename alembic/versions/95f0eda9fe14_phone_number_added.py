"""phone number added

Revision ID: 95f0eda9fe14
Revises: 
Create Date: 2025-03-02 12:47:08.464624

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '95f0eda9fe14'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    #op.add_column('users', sa.Column('phone_number', sa.String(length=15), nullable=True))
    pass

def downgrade() -> None:
    #op.drop_column('users', 'phone_number')
    pass