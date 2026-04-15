function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Extract the sessionId sent from your Vercel controller
    var sessionId = data.sessionId || "No Session ID";
    var userMsg = data.message || "";
    var aiResp = data.response || "";
    var status = data.status || "Success";
    
    // Append the row: Timestamp, SessionID, User Message, AI Response, Status
    sheet.appendRow([new Date(), sessionId, userMsg, aiResp, status]);
    
    return ContentService.createTextOutput("Success");
  } catch (err) {
    console.log("Error: " + err.toString());
    return ContentService.createTextOutput("Error: " + err.toString());
  }
}