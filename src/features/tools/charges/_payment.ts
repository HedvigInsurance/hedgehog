import { css } from 'react-emotion'

export const monthPickerStyles = css({
  '.calendar-container': {
    width: '360px',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
    background: '#fff',
    border: '2px solid #eee',
    borderBottomRightRadius: '5px',
    borderBottomLeftRadius: '5px',
  },

  /*  SECTIONS  */
  '.section_mp': {
    clear: 'both',
    padding: '0px',
    margin: '0px',
  },

  /*  COLUMN SETUP  */
  '.col_mp': {
    display: 'block',
    float: 'left',
    textAlign: 'center',
    fontSize: '16px',
    paddingBottom: '5px',
    paddingTop: '5px',
  },
  '.col_mp:first-child': {
    marginLeft: 0,
  },

  /*  GROUPING  */
  '.group_mp:before, .group:after': {
    content: '""',
    display: 'table',
  },
  '.group_mp:after': {
    clear: 'both',
  },
  '.group_mp': {
    zoom: 1 /* For IE 6/7 */,
  },

  /*  GRID OF THREE  */
  '.span_1_of_3_mp': { width: '33.33%' },

  '.col_mp:hover': {
    color: 'white',
    backgroundColor: 'darkslateblue',
    cursor: 'pointer',
  },
  '.selected_date_mp': {
    fontSize: '12px',
    color: 'darkslateblue',
    fontWeight: 'bold',
  },
  '.selected_cell': {
    backgroundColor: 'darkslateblue',
    fontStyle: 'italic',
    color: '#fff',
  },
  '.arrows_mp': {
    fontWeight: 'bold',
    fontSize: '18px',
  },
})
