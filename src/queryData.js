const { ValueViewerSymbol } = require("@runkit/value-viewer");

const cssURL = "https://sliceup.sfo2.digitaloceanspaces.com/dataTable.css";

/** Creates QueryData object.
 *
 * @param {object} result Query result.
 */
const QueryData = result => {
    const { data } = result;
    const { headers } = result;
    const { duration } = result;

    return {
        /**
         * Query result data
         */
        data,

        /**
         * Query headers
         */
        headers,

        /**
         * Query duration
         */
        duration,

        /**
         * Creates RunKit's ValueViewer object.
         *
         * @returns {object} {[ValueViewerSymbol]: object}
         */
        visualize: () => {
            const title = "QueryData";
            const html = produceTableHtml(headers, data, duration);

            return {
                [ValueViewerSymbol]: {
                    title,
                    HTML: html
                }
            };
        }
    };
};

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

module.exports = {
    QueryData
};
