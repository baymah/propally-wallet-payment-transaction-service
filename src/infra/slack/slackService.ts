const axios = require("axios")
export const slackNotify = async (text: string, hook = "apiLog") => {
  const slackWebhookUrl = "https://hooks.slack.com/services/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"
  // if (process.env.NODE_ENV === "production")
  axios
    .post(slackWebhookUrl, { text })
    .then((response) => {
      console.log("Message sent to Slack successfully:", response.data)
    })
    .catch((notifyError) => {
      console.log("Error sending message to Slack:", notifyError)
    })
}
