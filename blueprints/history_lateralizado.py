from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from models import (db, HistoryLateralizado, Siila1Table, Siila2Table, Siila3Table, 
                    RegionTable, MarketTable, CadastreTable, ContactTable, IndustryTable, DateTable)
from utils import get_menu_context
from datetime import datetime
from models.logs_table import LogsTable
from sqlalchemy import text

history_lateralizado_bp = Blueprint('history_lateralizado', __name__)

@history_lateralizado_bp.route('/')
@login_required
def history_lateralizado():
    current_table, tables = get_menu_context('History Lateralizado')
    return render_template('group1/history_lateralizado.html', tables=tables, current_table=current_table)

@history_lateralizado_bp.route('/get_history_lateralizado_data', methods=['GET', 'POST'])
@login_required
def get_history_lateralizado_data():
    draw = request.form.get('draw')
    start = request.form.get('start')
    length = request.form.get('length')
    search_value = request.form.get('search[value]')
    order_column = request.form.get('order[0][column]')
    order_dir = request.form.get('order[0][dir]')

    # get order query
    order_query = get_datatables_order_query(HistoryLateralizado, order_column, order_dir)
    
    # get search query
    search_query = get_datatables_search_query(HistoryLateralizado, search_value)

    # Query the database
    history_data = HistoryLateralizado.query.order_by(order_query).filter(search_query).offset(start).limit(length).all()
    records_total = HistoryLateralizado.query.count()
    records_filtered = HistoryLateralizado.query.filter(search_query).count()

    # Prepare the data to be sent as JSON
    data = [item.to_dict() for item in history_data]

    # Return the data as a JSON object
    output = {
        "draw": draw,
        "recordsTotal": records_total,
        "recordsFiltered": records_filtered,
        "data": data,
    }

    return jsonify(output)

@history_lateralizado_bp.route('/update_history_lateralizado', methods=['POST'])
@login_required
def update_history_lateralizado():
    # Extract data from form
    table_id = request.form.get('table_id')
    column_name = request.form.get('column_name')
    new_value = request.form.get('new_value')
    user = current_user.username

    # Get the old value before updating
    old_value = db.session.query(HistoryLateralizado).filter(HistoryLateralizado.SIILA3_ID == table_id).first().__getattribute__(column_name)

    # Perform the update operation
    db.session.query(HistoryLateralizado).filter(HistoryLateralizado.SIILA3_ID == table_id).update({column_name: new_value})

    # Log the update operation
    log = LogsTable(
        table_name='History Lateralizado', 
        variable_name=column_name, 
        table_id=table_id, 
        old_value=old_value, 
        new_value=new_value, 
        user=user, 
        date_update=datetime.now(), 
        update_type="Update"
    )
    db.session.add(log)

    # Commit the changes
    db.session.commit()

    return jsonify(success=True)

@history_lateralizado_bp.route('/get_data_from_table', methods=['GET'])
@login_required
def get_data_from_table():
    table_name = request.args.get('table_name')
    column_name = request.args.get('column_name')
    row_id = request.args.get('row_id')

    # Query the appropriate table and filter by ID
    if table_name == 'siila1':
        row = Siila1Table.query.get(row_id)
    elif table_name == 'siila2':
        row = Siila2Table.query.get(row_id)
    elif table_name == 'siila3':
        row = Siila3Table.query.get(row_id)
    else:
        return jsonify(success=False, message="Invalid table name")

    # Check if the row exists and the column is valid
    if row and hasattr(row, column_name):
        return jsonify(success=True, data=getattr(row, column_name))
    else:
        return jsonify(success=False, message="Invalid row ID or column name")

@history_lateralizado_bp.route('/get_cadastre_names', methods=['GET'])
@login_required
def get_cadastre_names():
    # Query all names from the CadastreTable
    names = [cadastre.CADASTRE_NAME for cadastre in CadastreTable.query.all()]
    
    # Return the names as a JSON array
    return jsonify(names)

@history_lateralizado_bp.route('/update_original_table', methods=['POST'])
@login_required
def update_original_table():
    table_name = request.form.get('table_name')
    column_name = request.form.get('column_name')
    row_id = request.form.get('row_id')
    new_value = request.form.get('new_value')
    user = current_user.username

    # Query the appropriate table and filter by ID
    if table_name == 'siila1':
        row = Siila1Table.query.get(row_id)
    elif table_name == 'siila2':
        row = Siila2Table.query.get(row_id)
    elif table_name == 'siila3':
        row = Siila3Table.query.get(row_id)
    else:
        return jsonify(success=False, message="Invalid table name")

    # Check if the row exists and the column is valid
    if row and hasattr(row, column_name):
        old_value = getattr(row, column_name)
        setattr(row, column_name, new_value)
        db.session.commit()

        # Log the update operation
        log = LogsTable(
            table_name=table_name, 
            variable_name=column_name, 
            table_id=row_id, 
            old_value=old_value, 
            new_value=new_value, 
            user=user, 
            date_update=datetime.now(), 
            update_type="Update"
        )
        db.session.add(log)
        db.session.commit()

        return jsonify(success=True)
    else:
        return jsonify(success=False, message="Invalid row ID or column name")
