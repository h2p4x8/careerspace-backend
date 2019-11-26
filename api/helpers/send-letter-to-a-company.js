let mails = sails.config.mailgun;
var petrovich = require('petrovich');

module.exports = {


  friendlyName: 'Send letter to a company',


  description: '',


  inputs: {
    userInfo: {
      type: 'json'
    },
    vacancyInfo: {
      type: 'json'
    },
    attachment: {
      type: 'ref'
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const {
      userInfo,
      vacancyInfo,
      attachment
    } = inputs;

    console.log('attachment', attachment)

    const positionNameTag =  await sails.helpers.translit.with({
      text: vacancyInfo.position
    })

    const companyNameTag = await sails.helpers.translit.with({
      text: vacancyInfo.companyName
    })

    console.log(positionNameTag, companyNameTag)

    const data = {
      from: 'careerspace <notify@careerspace.app>',
      to: `${vacancyInfo.contactName} <${vacancyInfo.email}>`,
      subject: `Кандидат на позицию ${vacancyInfo.position} в ${vacancyInfo.companyName}`,
      'h:Reply-To': `${userInfo.email}`,
      "o:tag" : ['apply-to-company',  positionNameTag, companyNameTag],
      html: `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
      .ReadMsgBody { width:100%; }
      .ExternalClass { width:100%; }
      .ExternalClass * { line-height:100%; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
      }</style><!--<![endif]--><!--[if mso]>
    <xml>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-px-480 { width:480px !important; max-width: 480px; }
.mj-column-px-380 { width:380px !important; max-width: 380px; }
.mj-column-px-400 { width:400px !important; max-width: 400px; }
}</style><style type="text/css"></style></head><body><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;Margin:0px;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 33px 40px 50px;text-align:left;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:480px;" ><![endif]--><div class="mj-column-px-480 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0 0 15px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:24px;font-weight:500;line-height:44px;text-align:left;color:#000000;">Новый кандидат</div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 10px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">${vacancyInfo.contactName.split(' ')[0]}, добрый день!</div></td></tr><tr><td vertical-align="top" style="font-size:0px;word-break:break-word;"><div class="mj-column-px-380 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0 0 10px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">Ваша вакансия ${vacancyInfo.position} в ${vacancyInfo.companyName} нравится соискателям!</div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 10px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">${userInfo.fullName} прислал(а) вам сопроводительное письмо и резюме.</div></td></tr></table></div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 15px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:18px;font-weight:500;line-height:29px;text-align:left;color:#000000;">Сопроводительное письмо</div></td></tr><tr><td vertical-align="top" style="font-size:0px;word-break:break-word;"><div class="mj-column-px-400 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0 0 20px 20px;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">${userInfo.coveringLetter}</div></td></tr></table></div></td></tr><tr><td vertical-align="top" style="font-size:0px;word-break:break-word;"><div class="mj-column-px-380 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0 0 10px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">Вы можете ответить прямо из этого письма и пригласить на интервью. Для этого просто нажмите на кнопку «ответить» и введите текст письма. Ваше письмо попадет к ${petrovich.androgynous.first.dative(userInfo.fullName.split(' ')[0])} на почту.</div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 20px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">На всякий случай, вот email ${petrovich.androgynous.first.genitive(userInfo.fullName.split(' ')[0])}: <span style="font-weight:800">${userInfo.email}</span></div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 30px 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">P.S. Пожалуйста, давайте обратную связь кандидатам, которые вам не подошли.</div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 0 0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;font-size:12px;line-height:14px;text-align:left;color:#000000;">Если вам нравятся отклики, которые приходят с нашей платформы и вы хотели бы побольше о нас узнать напишите Арине: <span style="font-weight:800">a.egorova@careerspace.app</span></div></td></tr></table></div></td></tr></table><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 33px 40px 50px;text-align:left;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:33px;" ><![endif]--><div class="mj-column-px-33 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"><tr><td align="center" style="font-size:0px;padding:0 14px 0 0;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:19px;"><img height="auto" src="https://i.imgur.com/rJ87zBj.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="19"></td></tr></tbody></table></td></tr></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:258.5px;" ><![endif]--><div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"><tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;;font-size:12px;line-height:14px;text-align:left;color:#000000;">All-in-one your<br><a href="https://dev.careerspace.app" target="_blank" class="link">careerspace.app</a></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`,

    }

    if (attachment) {
      data.attachment = attachment;
    }

    const send = () => {
      mails.messages().send((data), function (error, body) {
        console.log(error)
        if (error) send();
      });

      return {success: true}
    }

    return send();



  },

};
