const { ValueViewerSymbol } = require("@runkit/value-viewer");

const cssURL = "https://sliceup.sfo2.digitaloceanspaces.com/dataTable.css";

/** Creates QueryData object.
 *
 * @param {object} result Query result.
 */
const QueryData = async (result) => {
    const data = result.data;
    const headers = result.headers;
    const duration = result.duration;

    return {
        /**
         * Query result data
         */
        data: data,

        /**
         * Query headers
         */
        headers: headers,

        /**
         * Query duration
         */
        duration: duration,

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
    }
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
