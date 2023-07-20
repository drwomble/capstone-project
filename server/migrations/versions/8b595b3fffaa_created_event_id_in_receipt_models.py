"""created event id in receipt models

Revision ID: 8b595b3fffaa
Revises: d7558775ff8e
Create Date: 2023-07-20 17:34:43.506153

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b595b3fffaa'
down_revision = 'd7558775ff8e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('receipts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event_id', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('receipts', schema=None) as batch_op:
        batch_op.drop_column('event_id')

    # ### end Alembic commands ###
