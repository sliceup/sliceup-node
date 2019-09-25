const { ValueViewerSymbol } = require("@runkit/value-viewer");

const cssURL = "https://sliceup.sfo2.digitaloceanspaces.com/dataTable.css";

function produceTableHtml(headers, data, duration) {
    let html = `<link rel="stylesheet" href="${cssURL}">`;
    html += '<div class="data_table"><table><thead><tr>';

    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });

    html += "</tr></thead><tbody>";

    data.forEach(row => {
        html += "<tr>";
        row.forEach(column => {
            html += `<td>${column}</td>`;
        });
        html += "</tr>";
    });

    html += "</tbody><tfoot><tr>";
    html += `<td colspan="${headers.length}">Duration: ${duration}</td>`;
    html += "</tr></tfoot></table></div>";

    return html;
}

/** @class Represents data returned by database queries. */
class QueryData {
    /**
     * Creates QueryData object.
     *
     * @param {object} data Query result.
     */
    constructor(data) {
        this.data = data.data;
        this.headers = data.headers;
        this.duration = data.duration;
    }

    /**
     * Creates RunKit's ValueViewer object.
     *
     * @returns {object} {[ValueViewerSymbol]: object}
     */
    visualize() {
        const title = "QueryData";
        const html = produceTableHtml(this.headers, this.data, this.duration);

        return {
            [ValueViewerSymbol]: {
                title,
                HTML: html
            }
        };
    }
}

module.exports = {
    QueryData
};
