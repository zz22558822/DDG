// 取得今日時間 (含Str轉換)
let date = new Date(); //總時間
let today = date.toISOString().split('T')[0]; //以-分開之日期
let year = date.getFullYear().toString(); //年
let month = date.getMonth().toString(); //月
if (month.length == 1) {
    month = "0" + month
}
let day = date.getDate().toString(); //日
if (day.length == 1) {
    day = "0" + day
}

const ProfileText = document.querySelector('.ProfileText')
const NameText = document.querySelector('.NameText')
const capital = document.getElementById('capital')
const Pbox = document.querySelector('.prompt-box')
const Pclose = document.querySelector('.prompt-close');
const defaultData = '475978'


// --------------------(產生器)--------------------

// 當按鈕被點擊時，觸發下載操作
document.querySelector('.btn').addEventListener('click', function () {

    if (!capital.checked && ProfileText.value.length != 6) {
        ProfileText.value = ''
        ProfileText.placeholder = '請輸入正確的資料'
        console.log('格式錯誤，不足六位數。');
        Pbox.classList.add('open-box');
        Pclose.focus();
        return
    }else if (!capital.checked &&containsInvalidCharacters()) {
        ProfileText.value = ''
        ProfileText.placeholder = '請輸入正確的資料'
        console.log('格式錯誤，僅可使用英文數字。');
        Pbox.classList.add('open-box');
        Pclose.focus();
        return
    }

    let content = 
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadDisplayName</key>
    <string>ChekDNS</string>
    <key>PayloadDescription</key>
    <string>此服務創建於 Chek. -${date.toISOString().split('T')[0]}</string>
    <key>PayloadIdentifier</key>
    <string>io.nextdns.${convertToLowerCase(capital.checked ? XXS(defaultData) : XXS(ProfileText.value))}.profile</string>
    <key>PayloadScope</key>
    <string>User</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>A1E2F262-DB73-40F6-BD22-2E42A43A3C94.${convertToLowerCase(capital.checked ? XXS(defaultData) : XXS(ProfileText.value))}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
    <key>PayloadContent</key>
    <array>
    <dict>
        <key>DNSSettings</key>
        <dict>
        <key>DNSProtocol</key>
        <string>HTTPS</string>
        <key>ServerURL</key>
        <string>https://apple.dns.nextdns.io/${convertToLowerCase(capital.checked ? XXS(defaultData) : XXS(ProfileText.value))}/${XXS2(NameText.value).length != 0 ? XXS2(NameText.value) : '未知IPhone%20'+year+month+day}</string>
        </dict>
        <key>OnDemandRules</key>
        <array>
        <dict>
            <key>Action</key>
            <string>EvaluateConnection</string>
            <key>ActionParameters</key>
            <array>
            <dict>
                <key>DomainAction</key>
                <string>NeverConnect</string>
                <key>Domains</key>
                <array>
                <string>dav.orange.fr</string>
                <string>msg.t-mobile.com</string>
                </array>
            </dict>
            </array>
        </dict>
        <dict>
            <key>Action</key>
            <string>Connect</string>
        </dict>
        </array>
        <key>PayloadType</key>
        <string>com.apple.dnsSettings.managed</string>
        <key>PayloadIdentifier</key>
        <string>io.nextdns.${convertToLowerCase(capital.checked ? XXS(defaultData) : XXS(ProfileText.value))}.profile.dnsSettings.managed</string>
        <key>PayloadUUID</key>
        <string>A1E2F262-DB73-40F6-BD22-2E42A43A3C94.${convertToLowerCase(capital.checked ? XXS(defaultData) : XXS(ProfileText.value))}.dnsSettings.managed</string>
        <key>PayloadDisplayName</key>
        <string>ChekDNS</string>
        <key>PayloadOrganization</key>
        <string>ChekDNS</string>
        <key>PayloadVersion</key>
        <integer>1</integer>
    </dict>
    </array>
</dict>
</plist>`;


    // 創建 Blob 對象，將內容放入其中
    let blob = new Blob([content], { type: 'text/plain' });

    // 創建一個 URL 將 Blob 連接起來
    let url = URL.createObjectURL(blob);

    // 創建一個隱藏的連結元素，並設置下載的 URL
    let a = document.createElement('a');
    a.href = url;
    a.download = 'DNS.mobileconfig';

    // 模擬點擊下載文件
    document.body.appendChild(a);
    a.click();

    // 移除連結元素
    document.body.removeChild(a);

    // 釋放 URL
    URL.revokeObjectURL(url);
});


// 特殊符號改為%20 去除重複%20
function XXS(str) {
    
    // 使用正則表達式替換非字母數字字符為 %20
    let replacedStr = str.replace(/[^a-zA-Z0-9]/g, '%20');
    // 使用正則表達式將多個連續的 %20 替換為一個 %20
    let finalStr = replacedStr.replace(/(%20)+/g, '%20');
    // 返回最終處理過的字符串
    return finalStr;
    
}

// 空白鍵改為%20 去除重複%20
function XXS2(str) {
    
    // 使用正則表達式替換非字母數字字符為 %20
    let replacedStr = str.replace(/\s/g, '%20');
    // 使用正則表達式將多個連續的 %20 替換為一個 %20
    let finalStr = replacedStr.replace(/(%20)+/g, '%20');
    // 返回最終處理過的字符串
    return finalStr;
    
}

// 定義檢查函數
function containsInvalidCharacters() {
    // 使用正則表達式檢查 ProfileText.value
    const regex = /^[a-zA-Z0-9]*$/;
    return !regex.test(ProfileText.value);
}

// 定義將字符串轉換為小寫的函數
function convertToLowerCase(str) {
    // 使用 toLowerCase 方法將字符串轉換為小寫
    return str.toLowerCase();
}

// 關閉 提示框
function PcloseBox(e) {
    e.preventDefault();
    Pbox.classList.remove('open-box');
    ProfileText.focus();
}
Pclose.addEventListener('click', PcloseBox);

