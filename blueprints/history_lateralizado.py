from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from models import (db, HistoryLateralizado, Siila1Table, Siila2Table, Siila3Table, 
                    RegionTable, MarketTable, CadastreTable, ContactTable, IndustryTable, DateTable)
from utils import get_menu_context
from datetime import datetime
from models.logs_table import LogsTable
from sqlalchemy import text, or_, asc, desc

history_lateralizado_bp = Blueprint('history_lateralizado', __name__)

@history_lateralizado_bp.route('/')
@login_required
def history_lateralizado():
    current_table, tables = get_menu_context('History Lateralizado')
    return render_template('group1/history_lateralizado.html', tables=tables, current_table=current_table)

def get_datatables_order_query(model, order_column, order_dir):
    if order_column is not None:
        column = model.__table__.columns[order_column]
        if order_dir == 'desc':
            return desc(column)
        else:
            return asc(column)
    return None

def get_datatables_search_query(model, search_value):
    if search_value:
        filters = [
            model.siila3_id.like(f"%{search_value}%"),
            model.market_name.like(f"%{search_value}%"),
            model.region_name.like(f"%{search_value}%"),
            # Add other columns as needed
        ]
        return or_(*filters)
    else:
        return None

@history_lateralizado_bp.route('/get_history_lateralizado_data', methods=['GET', 'POST'])
def get_history_lateralizado_data():
    draw = request.form.get('draw')
    start = request.form.get('start')
    length = request.form.get('length')
    search_value = request.form.get('search[value]')

    # Define the query with necessary joins and columns
    history_data_query = db.session.query(
        HistoryLateralizado.SIILA3_ID,
        HistoryLateralizado.MARKET_NAME.label("Market"),
        HistoryLateralizado.PROPERTY_TYPE.label("Property Type"),
        HistoryLateralizado.SIILA1_ID.label("SiiLA_ID"),
        HistoryLateralizado.SIILA1_NAME.label("NOME"),
        HistoryLateralizado.REGION_NAME.label("REGIÃO_SiiLA"),
        Siila1Table.CLASS.label("CLASSE"),
        HistoryLateralizado.DELIVERY_DATE.label("DATA DE ENTREGA"),
        Siila3Table.STATUS,
        HistoryLateralizado.SIILA2_NAME.label("ANDAR"),
        HistoryLateralizado.SIILA3_NAME.label("CONJUNTO"),
        HistoryLateralizado.AREA.label("AREA_CONJ./ANDAR"),
        HistoryLateralizado.c['201504'],
        HistoryLateralizado.c['201601'],
        HistoryLateralizado.c['201602'],
        HistoryLateralizado.c['201603'],
        HistoryLateralizado.c['201604'],
        HistoryLateralizado.c['201701'],
        HistoryLateralizado.c['201702'],
        HistoryLateralizado.c['201703'],
        HistoryLateralizado.c['201704'],
        HistoryLateralizado.c['201801'],
        HistoryLateralizado.c['201802'],
        HistoryLateralizado.c['201803'],
        HistoryLateralizado.c['201804'],
        HistoryLateralizado.c['201901'],
        HistoryLateralizado.c['201902'],
        HistoryLateralizado.c['201903'],
        HistoryLateralizado.c['201904'],
        HistoryLateralizado.c['202001'],
        HistoryLateralizado.c['202002'],
        HistoryLateralizado.c['202003'],
        HistoryLateralizado.c['202004'],
        HistoryLateralizado.c['202101'],
        HistoryLateralizado.c['202102'],
        HistoryLateralizado.c['202103'],
        HistoryLateralizado.c['202104'],
        HistoryLateralizado.c['202201'],
        HistoryLateralizado.c['202202'],
        HistoryLateralizado.c['202203'],
        HistoryLateralizado.c['202204'],
        HistoryLateralizado.c['202301'],
        HistoryLateralizado.c['202302'],
        HistoryLateralizado.c['202303'],
        HistoryLateralizado.c['202303_INDUSTRY_NAME'].label("Industry"),
        Siila3Table.REGISTRY.label("Registry"),
        HistoryLateralizado.c['202303_CONTACT_NAME'].label("Tenant Contact"),
        HistoryLateralizado.c['202303_CONTACT_PHONE'].label("Tenant Contact Phone"),
        HistoryLateralizado.c['202303_CONTACT_EMAIL'].label("Tenant Contact Email")
    ).join(
        Siila1Table, HistoryLateralizado.SIILA1_ID == Siila1Table.SIILA1_ID
    ).join(
        Siila3Table, HistoryLateralizado.SIILA3_ID == Siila3Table.SIILA3_ID
    ).filter(
        Siila3Table.STATUS == 'CONCLUÍDO'
    )

    # Apply ordering and pagination
    if search_value:
        # You can add custom search logic here if needed
        pass
    if start:
        history_data_query = history_data_query.offset(start)
    if length:
        history_data_query = history_data_query.limit(length)

    # Execute the query
    history_data = history_data_query.all()

    # Convert the results to a list of dictionaries
    data = [{
        'SIILA3_ID': row.SIILA3_ID,
        'Market': row.Market,
        'Property Type': row.Property_Type,
        'SiiLA_ID': row.SiiLA_ID,
        'NOME': row.NOME,
        'REGIÃO_SiiLA': row.REGIÃO_SiiLA,
        'CLASSE': row.CLASSE,
        'DATA DE ENTREGA': row['DATA DE ENTREGA'],
        'STATUS': row.STATUS,
        'ANDAR': row.ANDAR,
        'CONJUNTO': row.CONJUNTO,
        'AREA_CONJ./ANDAR': row['AREA_CONJ./ANDAR'],
        '201504': row['201504'],
        '201504': row['201504'],
        '201601': row['201601'],
        '201602': row['201602'],
        '201603': row['201603'],
        '201604': row['201604'],
        '201701': row['201701'],
        '201702': row['201702'],
        '201703': row['201703'],
        '201704': row['201704'],
        '201801': row['201801'],
        '201802': row['201802'],
        '201803': row['201803'],
        '201804': row['201804'],
        '201901': row['201901'],
        '201902': row['201902'],
        '201903': row['201903'],
        '201904': row['201904'],
        '202001': row['202001'],
        '202002': row['202002'],
        '202003': row['202003'],
        '202004': row['202004'],
        '202101': row['202101'],
        '202102': row['202102'],
        '202103': row['202103'],
        '202104': row['202104'],
        '202201': row['202201'],
        '202202': row['202202'],
        '202203': row['202203'],
        '202204': row['202204'],
        '202301': row['202301'],
        '202302': row['202302'],
        '202303': row['202303'],
        '202303': row['202303'],
        'Industry': row.Industry,
        'Registry': row.Registry,
        'Tenant Contact': row['Tenant Contact'],
        'Tenant Contact Phone': row['Tenant Contact Phone'],
        'Tenant Contact Email': row['Tenant Contact Email']
    } for row in history_data]

    # Query total records and filtered records
    records_total = HistoryLateralizado.query.count()
    records_filtered = history_data_query.count()  # Update this logic if you add search filters

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
