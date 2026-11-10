export async function sendAuthEmail(to:string,subject:string,url:string){
 if(!process.env.RESEND_API_KEY)throw Error('メール送信が設定されていません')
 const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.MAIL_FROM,to:[to],subject,text:`${subject}\n\n以下のリンクを開いて手続きを完了してください。\n${url}\n\nこの操作に心当たりがない場合は、このメールを無視してください。`})})
 if(!result.ok)throw Error('メールの送信に失敗しました')
}
