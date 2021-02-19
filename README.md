# CertWatcher
A tool for the lazy OSINTer that focuses on discovery of subdomains related to a specific domain. The tool will run for free in Google Apps script and runs daily and returns results to a Slack channel.

This tool was designed to allow me to keep an eye on a specific domain and to get a near real-time notification each day on new domains that hit the CT log the previous day. Again, you will notice this script can be modified easily for however you want. It's really just a simple skeleton. You could easily modify it to email a list or you could add it to a running list to keep track of over time, etc. These are some of the different options I have considered  as well as a few other things. I will leave that up to the reader or take suggestions and maybe I’ll take some time to add them.

How it works.
The Apps Script is set to make a request out every day. The request fetches the json data from Crt.sh for the results from a specific domain excluding expired and deduplication. The returned json data is parsed for anything that was added the previous day. I did the previous day, to ensure that I didn’t miss anything if it ran at 10am but something was added at 10:05. So I accept that I will be about a day behind (near real-time). The entity name is then pulled and I create a slack payload and post it to a Slack webhook that I have created for our team.

