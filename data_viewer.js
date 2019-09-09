const { ValueViewerSymbol } = require("@runkit/value-viewer");

class DataViewer
{
  constructor(data) {
    this.data = data.data;
    this.headers = data.headers;
    this.duration = data.duration;
  }

  chart()
  {
      const title = "DataViewer";
      let html = '<div class="data_table"><table><theader><tr>';
    
      this.headers.forEach(function(header) {
        html += '<th>' + header + '</th>'
      });
        
      html += '</tr></theader><tbody>';
              
      this.data.forEach(function(row) {
        html += '<tr>';
        row.forEach(function(column) {
          html += '<td>' + column + '</td>';
        });    
        html += '</tr>';
      });     
              
      html += '</tbody></table></div>';
      
      return {
        [ValueViewerSymbol]: {
            title: title,
            HTML: html
        }
      };
  }
}


module.exports = {
    DataViewer: DataViewer
}