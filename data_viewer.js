const { ValueViewerSymbol } = require("@runkit/value-viewer");

class DataViewer
{
  constructor(result)
  {
      const { data, duration, headers } = result;
      const title = "DataViewer";
      let HTML = '<div class="data_table"><table><theader><tr>';
    
      headers.forEach(function(header) {
        HTML += '<th>' + header + '</th>'
      });
        
      HTML += '</tr></theader><tbody>';
              
      data.forEach(function(row) {
        HTML += '<tr>';
        row.forEach(function(column) {
            HTML += '<td>' + column + '</td>';
        });    
        HTML += '</tr>';
      });     
              
      HTML += '</tbody></table></div>';
      
      Object.assign(this, result, { [ValueViewerSymbol]: { title, HTML } });
    }
}


module.exports = {
    DataViewer: DataViewer
}