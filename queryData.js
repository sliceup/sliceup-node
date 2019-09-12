const { ValueViewerSymbol } = require("@runkit/value-viewer");

const cssURL = "https://sliceup.sfo2.digitaloceanspaces.com/dataTable.css";

function produceTableHtml(headers, data, duration) {
    let html = '<link rel="stylesheet" href="' + cssURL +'">';
    html += '<div class="data_table"><table><thead><tr>';

    headers.forEach(function(header) {
        html += '<th>' + header + '</th>'
    });

    html += '</tr></thead><tbody>';

    data.forEach(function(row) {
        html += '<tr>';
        row.forEach(function(column) {
            html += '<td>' + column + '</td>';
        });
        html += '</tr>';
    });

    html += '</tbody><tfoot><tr>';
    html += '<td colspan="' + headers.length + '">Duration: ' + duration + '</td>';
    html += '</tr></tfoot></table></div>';

    return html;
}

class QueryData
{
  constructor(data) {
    this.data = data.data;
    this.headers = data.headers;
    this.duration = data.duration;
  }

  visualize()
  {
      const title = "QueryData";
      const html = produceTableHtml(this.headers, this.data, this.duration);
      
      return {
        [ValueViewerSymbol]: {
            title: title,
            HTML: html
        }
      };
  }
}

module.exports = {
    QueryData: QueryData
};
