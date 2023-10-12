import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { setDisabled, setIdxSelected } from '../../actions/disableState';
import { CircularProgress } from '@material-ui/core';

const rows = [
  { id: 'cid', numeric: false, disablePadding: true, label: 'Company ID' },
  { id: 'aid', numeric: true, disablePadding: false, label: 'Account Header ID' },
  { id: 'docno', numeric: true, disablePadding: false, label: 'Document Number' },
  { id: 'bcode', numeric: true, disablePadding: false, label: 'Business Code' },
  { id: 'dtype', numeric: true, disablePadding: false, label: 'Document Type' },
  { id: 'cnum', numeric: true, disablePadding: false, label: 'Customer Number' },
  { id: 'cmapid', numeric: true, disablePadding: false, label: 'Customer Map ID' },
  { id: 'cname', numeric: true, disablePadding: false, label: 'Name of Customer' },
  { id: 'docCreate', numeric: true, disablePadding: false, label: 'Document Create Date' },
  { id: 'baseDate', numeric: true, disablePadding: false, label: 'Baseline Date' },
  { id: 'invDate', numeric: true, disablePadding: false, label: 'Invoice Date' },
  { id: 'invId', numeric: true, disablePadding: false, label: 'Invoice ID' },
  { id: 'totalAmt', numeric: true, disablePadding: false, label: 'Total Open Amount' },
  { id: 'payTerm', numeric: true, disablePadding: false, label: 'Customer payment Terms' },
  { id: 'clearDate', numeric: true, disablePadding: false, label: 'Clear Date' },
  { id: 'isOpen', numeric: true, disablePadding: false, label: 'Is Open Invoice' },
  { id: 'shipDate', numeric: true, disablePadding: false, label: 'Shipping Date' },
  { id: 'payAmt', numeric: true, disablePadding: false, label: 'Payment Amount' },
  { id: 'dayPast', numeric: true, disablePadding: false, label: 'Days past Due Date' },
  { id: 'docId', numeric: true, disablePadding: false, label: 'Doc Id' },
  { id: 'docCreate2', numeric: true, disablePadding: false, label: 'Document Create Date' },
  { id: 'actAmt', numeric: true, disablePadding: false, label: 'Actual Amount Outstanding' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age of Invoice' },
  { id: 'curr', numeric: true, disablePadding: false, label: 'Invoice Currency' },
];

class EnhancedTableHead extends React.Component {

  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                    {row.label}
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    overflow:'auto',
    height:'17rem',
    backgroundColor:theme.palette.primary.main,
  },
  tablePagination: {
    backgroundColor:'#252C48',height: '35px',minHeight: '35px'
    },
    tablePaginationCaption: {
    color: 'white'
    },
    tablePaginationSelectIcon: {
        color:theme.palette.primary.main,
    },
    tablePaginationSelect: {
    color:theme.palette.primary.main,
    },
    tablePaginationSelectRoot:{
    },
    tablePaginationActions: {
    color: 'white',
    },
});

class InvoiceTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selected: [],
        data: null,
        page: 0,
        rowsPerPage: 5,
    }
  }

  handleSelectAllClick = event => {
    const {setDisabled} = this.props
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.pk_id) }));
      return;
    }
    this.setState({ selected: [] });
    setDisabled(true);

  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const {setDisabled,setIndex} = this.props
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected },() => {
      const {selected} = this.state
      if(selected.length === 1){
        setDisabled(false)
        setIndex(selected[0])
      }else{
        setDisabled(true)
      }
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data } = this.props;
    const {selected, rowsPerPage, page } = this.state;
    if(data)
    return (
      <div className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={data.length}
            />
            <TableBody>
              {
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.pk_id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.pk_id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.pk_id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell align="right">{n.company_id}</TableCell>
                      <TableCell align="right">{n.acct_doc_header_id}</TableCell>
                      <TableCell align = 'right'>{n.document_number}</TableCell>
                      <TableCell align='left'>{n.business_code}</TableCell>
                      <TableCell align = 'left'>{n.doctype}</TableCell>
                      <TableCell align='right'>{n.customer_number}</TableCell>
                      <TableCell align = 'right'>{n.fk_customer_map_id}</TableCell>
                      <TableCell align = 'left'>{n.customer_name}</TableCell>
                      <TableCell align = 'center'>{n.document_create_date}</TableCell>
                      <TableCell align = 'center'>{n.baseline_create_date}</TableCell>
                      <TableCell align = 'center'>{n.invoice_date_norm}</TableCell>
                      <TableCell align = 'right'>{n.invoice_id}</TableCell>
                      <TableCell align = 'right'>{n.total_open_amount}</TableCell>
                      <TableCell align = 'right'>{n.cust_payment_terms}</TableCell>
                      <TableCell align = 'center'>{n.clearing_date}</TableCell>
                      <TableCell align='right'>{n.isOpen}</TableCell>
                      <TableCell align = 'center'>{n.ship_date}</TableCell>
                      <TableCell align = 'right'>{n.paid_amount}</TableCell>
                      <TableCell align = 'right'>{n.dayspast_due}</TableCell>
                      <TableCell align = 'right'>{n.document_id}</TableCell>
                      <TableCell align = 'center'>{n.document_creation_date}</TableCell>
                      <TableCell align = 'right'>{n.actual_open_amount}</TableCell>
                      <TableCell align = 'right'>{n.invoice_age}</TableCell>
                      <TableCell align = 'right'>{n.invoice_amount_doc_currency}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          classes={{
            root: classes.tablePagination,
            caption: classes.tablePaginationCaption,
            selectIcon: classes.tablePaginationSelectIcon,
            select: classes.tablePaginationSelect,
            selectRoot:classes.tablePaginationSelectRoot,
            actions: classes.tablePaginationActions,
          }}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );else
    return(
      <div className = {classes.root}>
        <CircularProgress/>
      </div>
    )
  }
}

InvoiceTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>({
  setDisabled:isDisable => dispatch(setDisabled(isDisable)),
  setIndex :idx => dispatch(setIdxSelected(idx))
})

const mapStateToProps = ({invoices:{data,custDetails}}) =>({
  data:custDetails
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InvoiceTable));
