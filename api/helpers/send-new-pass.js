let mails = sails.config.mailgun;
const path = require('path');

module.exports = {


  friendlyName: 'Send letter to a company',


  description: '',


  inputs: {
    userEmail: {
      type: 'string'
    },
    userPass: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  },


  exits: {
  },


  fn: async function (inputs) {
    const {
      userPass,
      userEmail,
      type
    } = inputs;
    console.log(inputs)

    const tag = type === 'signup' ? 'signup' : 'login'

    const data = {
      from: 'careerspace <notify@careerspace.app>',
      to: userEmail,
      subject: `Временный пароль для ${ type === 'signup' ? 'регистрации на' : 'входа в' } careerspace — "${userPass}"`,
      "o:tag" : [tag],
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
        .mj-column-px-500 { width:480px !important; max-width: 480px; }
.mj-column-px-33 { width:33px !important; max-width: 33px; }
.mj-column-per-50 { width:50% !important; max-width: 50%; }
}</style><style type="text/css">@media only screen and (max-width:460px) {
      table.full-width-mobile { width: 100% !important; }
      td.full-width-mobile { width: auto !important; }
    }</style><style type="text/css">.link { text-decoration: none; color: #00A7F2; }
      .column { width: fit-content }</style></head><body><div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 33px 0 50px;text-align:left;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:500px;" ><![endif]--><div class="mj-column-px-500 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tr><td align="left" style="font-size:0px;padding:0 0 15px;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;;font-size:24px;line-height:44px;text-align:left;color:#000000;">${type === 'signup' ? 'Регистрация' : 'Вход'}</div></td></tr>${ type === 'signup' ? `<tr><td align="left" style="font-size:14px;padding:0 0 20px;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;;font-size:14px;line-height:17px;text-align:left;color:#000000;">Мы не нашли аккаунт на careerspace c таким email.</div></td></tr>` : ''}<tr><td align="left" style="font-size:0px;padding:0 0 15px;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;;font-size:14px;line-height:17px;text-align:left;color:#000000;">Скопируйте и вставьте этот временный пароль${type === 'signup' ? ' для регистрации' : ''}:</div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 15px;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;;font-size:18px;font-weight:500;line-height:29px;text-align:left;color:#000000;">${userPass}</div></td></tr><tr><td align="left" style="font-size:0px;padding:0 0 20px;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;;font-size:12px;line-height:14px;text-align:left;color:#000000;">Если не пытались ${type === 'signup' ? 'зарегестрироваться' : 'войти'}, то можете проигнорировать это письмо. Ничего не произойдет.</div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="Margin:0px;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 33px 40px 50px;text-align:left;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:33px;" ><![endif]--><div class="mj-column-px-33 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"><tr><td align="center" style="font-size:0px;padding:0 14px 0 0;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:19px;"><img height="auto" src="https://i.imgur.com/rJ87zBj.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="19"></td></tr></tbody></table></td></tr></table></div><!--[if mso | IE]></td><td class="" style="vertical-align:top;width:258.5px;" ><![endif]--><div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"><tr><td align="left" style="font-size:0px;padding:0;word-break:break-word;"><div style="font-family:-apple-system, system-ui, BlinkMacSystemFont, 'Segoe U', Roboto, Ubuntu;;font-size:12px;line-height:14px;text-align:left;color:#000000;">All-in-one your<br><a href="https://dev.careerspace.app" target="_blank" class="link">careerspace.app</a></div></td></tr></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`,
    };
    console.log('1')
    const send = () => {
      mails.messages().send((data), function (error, body) {
        console.log(error)
        if (error) send();
      });
    }
    send();

    return {success: true}
  },

};
