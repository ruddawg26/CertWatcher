const slack_osint_webhook ="<PUT SLACK WEBHOOK HERE>";
const domain = "<PUT DOMAIN HERE>";

/* function search crt.sh for the iLIKE the comman name for he domain. There are other things you could do like 
by organization but this has worked best so far for one domain. IOutput is Json so easier to parse
If you use different URL, there are diferent responses it gives for field
for q=Org the field you want is common_name
*/
function find_cert_URL() {
  var crt_sh_URL = "https://crt.sh/?CN=" + domain + "&exclude=expired&deduplicate=Y&output=json"
  var response = UrlFetchApp.fetch(crt_sh_URL).getContentText();
  var today = new Date();
  //created a date for yesterday, if run on a daily trigger easier to look at yesterday instead of miss an entry posted after it ran
  var yesterday = new Date(today.setDate(today.getDate()-1));
  //this is to format the date in the desired format. It is set for New York Time Zone
  var yesterday_date = Utilities.formatDate(yesterday, "GMT-5", "yyyy-MM-dd");
  var obj = JSON.parse(response);
  
  
  for (var i=0; i< obj.length; i++){
   var entry = obj[i]["entry_timestamp"].split('T')
   if ( entry[0] == yesterday_date){
     log_to_slack(obj[i]["name_value"])
     }
  }
  
  //return html;
}

function create_slack_payload(message = "[Certificate Transparancy] - This should never POST, if something went wrong") {
  var payload = {
    "text" : "[Certificate Transparency Entry] - " + message
  }    
  return payload
}


function log_to_slack(message) {
  
  var payload = create_slack_payload(message)

  var options = {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : JSON.stringify(payload),
     "muteHttpExceptions": true
  };

  var response = UrlFetchApp.fetch(slack_osint_webhook, options);
