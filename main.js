function fetchIncomeStatement() {
    const stockSymbol = document.getElementById('stockSymbol').value.trim().toUpperCase();
    const apiKey = 'GXqcokYeRt6rTqe8cpcUxGPiJhnTIzkf';
    if (!stockSymbol) {
        alert('Please enter a stock symbol.');
        return;
    }
    const apiUrl = `https://financialmodelingprep.com/api/v3/income-statement/${stockSymbol}?period=annual&apikey=${apiKey}`;
    fetchData(apiUrl, displayIncomeStatement, 'incomeStatementContainer');
}

function displayIncomeStatement(data, container) {
    if (!data || typeof data !== 'object') {
        container.innerHTML = '<p>Data not available.</p>';
        return;
    }

    let htmlContent = '<ul>';
    htmlContent += `<li>Date: ${data.date || 'N/A'}</li>`;
    htmlContent += `<li>Total Revenue: ${formatNumber(data.revenue)}</li>`;
    htmlContent += `<li>Cost of Revenue: ${formatNumber(data.costOfRevenue)}</li>`;
    htmlContent += `<li>Gross Profit: ${formatNumber(data.grossProfit)}</li>`;
    htmlContent += `<li>Research and Development Expenses: ${formatNumber(data.researchAndDevelopmentExpenses)}</li>`;
    htmlContent += `<li>Selling, General and Administrative Expenses: ${formatNumber(data.sellingGeneralAndAdministrativeExpenses)}</li>`;
    htmlContent += `<li>Operating Expenses: ${formatNumber(data.operatingExpenses)}</li>`;
    htmlContent += `<li>Interest Expense: ${formatNumber(data.interestExpense)}</li>`;
    htmlContent += `<li>Net Income: ${formatNumber(data.netIncome)}</li>`;
    htmlContent += '</ul>';
    container.innerHTML = htmlContent;
}

function formatNumber(value) {
    // Check if the value is numeric and format it, otherwise return 'N/A'
    return value != null && !isNaN(value) ? parseFloat(value).toLocaleString('en-US') : 'N/A';
}


function fetchEarningsCallTranscript() {
    const stockSymbol = document.getElementById('stockSymbol').value.trim().toUpperCase();
    const year = document.getElementById('yearInput').value;
    const quarter = document.getElementById('quarterInput').value;
    const apiKey = 'GXqcokYeRt6rTqe8cpcUxGPiJhnTIzkf'; // Your API key
    if (stockSymbol.length === 0 || year.length === 0 || quarter.length === 0) {
        alert('Please enter stock symbol, year, and quarter.');
        return;
    }
    const apiUrl = `https://financialmodelingprep.com/api/v3/earning_call_transcript/${stockSymbol}?year=${year}&quarter=${quarter}&apikey=${apiKey}`;
    fetchData(apiUrl, displayEarningsCallTranscript, 'earningsCallTranscriptContainer');
}

function displayEarningsCallTranscript(transcript, container) {
    let htmlContent = `<p id="transcriptPreview">${transcript.content.slice(0, 1000)}...</p>`;
    htmlContent += `<p id="fullTranscript" style="display:none;">${transcript.content}</p>`;
    container.innerHTML = htmlContent;
    document.getElementById('expandButton').style.display = 'inline';
}

function expandTranscript() {
    document.getElementById('transcriptPreview').style.display = 'none';
    document.getElementById('fullTranscript').style.display = 'block';
    document.getElementById('expandButton').style.display = 'none';
    document.getElementById('collapseButton').style.display = 'inline'; // 显示 "Read Less" 按钮
}

function collapseTranscript() {
    document.getElementById('transcriptPreview').style.display = 'block';
    document.getElementById('fullTranscript').style.display = 'none';
    document.getElementById('expandButton').style.display = 'inline'; // 再次显示 "Read More" 按钮
    document.getElementById('collapseButton').style.display = 'none'; // 隐藏 "Read Less" 按钮
}


function fetchData(apiUrl, callback, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<p>Loading...</p>';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // 檢查回應資料是否為 undefined 或非陣列
            if (data === undefined || !Array.isArray(data)) {
                container.innerHTML = '<p>Error loading data: Data is not an array or is undefined.</p>';
            } else {
                if (data.length > 0) {
                    callback(data[0], container);
                } else {
                    container.innerHTML = '<p>No data found for this symbol.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            container.innerHTML = '<p>Error loading data. Please check the console for more details.</p>';
        });
}


function fetchEarningsCallCalendar() {
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    const stockSymbol = document.getElementById('stockSymbol').value.trim().toUpperCase();
    const apiKey = 'GXqcokYeRt6rTqe8cpcUxGPiJhnTIzkf';
    if (!fromDate || !toDate) {
        alert('Please enter both from and to dates.');
        return;
    }
    const apiUrl = `https://financialmodelingprep.com/api/v3/earning_calendar?from=${fromDate}&to=${toDate}&apikey=${apiKey}`;
    fetchData_2(apiUrl, (data) => displayEarningsCallCalendar(data, 'earningsCallCalendarContainer', stockSymbol), 'earningsCallCalendarContainer');
}

function displayEarningsCallCalendar(data, containerId, stockSymbol) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container element not found');
        return;
    }

    if (!data || !Array.isArray(data)) {
        container.innerHTML = '<p>Error loading data: Data is not an array or is undefined.</p>';
        return;
    }

    const earningsData = stockSymbol ? data.filter(item => item.symbol.toUpperCase() === stockSymbol) : data;
    if (earningsData.length === 0) {
        container.innerHTML = `<p>No earnings calendar data found for ${stockSymbol}.</p>`;
        return;
    }

    let htmlContent = '<ul>';
    earningsData.forEach(item => {
        htmlContent += `<li>
            Date: ${item.date || 'N/A'} <br>
            Symbol: ${item.symbol || 'N/A'} <br>
            EPS: ${item.eps !== null ? item.eps.toFixed(4) : 'N/A'} <br>
            EPS Estimated: ${item.epsEstimated !== null ? item.epsEstimated.toFixed(4) : 'N/A'} <br>
            Revenue: ${item.revenue !== null ? item.revenue.toLocaleString() : 'N/A'} <br>
            Revenue Estimated: ${item.revenueEstimated !== null ? item.revenueEstimated.toLocaleString() : 'N/A'}
        </li>`;
    });
    htmlContent += '</ul>';
    container.innerHTML = htmlContent;
}

function fetchData_2(apiUrl, callback, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<p>Loading...</p>';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data); // 查看原始返回數據
            // 確保 data 是一個陣列
            if (Array.isArray(data)) {
                if (data.length > 0) {
                    callback(data, container);
                } else {
                    container.innerHTML = '<p>No data found for this symbol.</p>';
                }
            } else if (data !== undefined) {
                // 如果 data 不是陣列,也不是 undefined,則視為錯誤
                throw new Error('Data is not an array');
            } else {
                // 如果 data 是 undefined,顯示錯誤訊息
                container.innerHTML = '<p>Error loading data: Data is not an array or is undefined.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            container.innerHTML = `<p>Error loading data: ${error.message}. Please check the console for more details.</p>`;
        });
}

// function isWithinDateRange(dateStr, fromDate, toDate) {
//   const date = new Date(dateStr);
//   const from = new Date(fromDate);
//   const to = new Date(toDate);
//   return date >= from && date <= to;
// }


