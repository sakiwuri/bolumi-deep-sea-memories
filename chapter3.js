import {waterPath,rotatedPorts} from './chapter2.js';
const node=(nodeId,position,connectionPorts,orientation)=>({nodeId,position,connectionPorts,orientation,isRotatable:true,isBlocked:false});
const mapNodes=()=>[node('A',[1,0],['W','E'],1),node('B',[1,1],['W','N'],1),node('C',[0,1],['S','E'],2),node('D',[0,2],['W','E'],1)];
export const mapPath=s=>waterPath(s.nodes,{position:[1,0],port:'W'},{position:[0,2],port:'E'});
export const pressure=s=>(s.valves.A?2:0)+(s.valves.B?1:0)-(s.valves.L?1:0);
const def=(levelId,title,reward,difficulty,puzzleState,goal,objects,inventoryItems=[])=>({levelId,chapterId:3,sceneId:`wreck-${levelId}`,title,reward,difficulty,icon:['✧','✥','▣','◈','⌁','◉','✦','▤','▦','☾','✉','✪'][levelId-25],subtitle:'THE TIDESTAR',puzzleState:{notes:[],...puzzleState},goal,interactableObjects:objects,inventoryItems,winConditions:goal,hints:['觀察船艙內的線索。','將找到的記錄與機關對照。','繼續操作目前機關。']});
export const chapter3Levels=[
 def(25,'破碎的航海圖','破碎航圖','★★★',{nodes:mapNodes()},'旋轉碎片，拼接航線。',['map-rotate','map-check']),
 def(26,'不會指北的羅盤','潮星羅盤針','★★★',{sequence:[]},'讀懂航海桌與記錄，輸入方向。',['read-table','read-log','direction','check','clear']),
 def(27,'搖搖晃晃的貨艙','平衡貨箱章','★★★',{boxes:{1:'none',2:'none',5:'none',6:'none'}},'平衡左右貨箱，每側兩箱。',['box','balance']),
 def(28,'舷窗外的雙色潮汐','舷窗潮色片','★★★★',{tide:'low',sequence:[],inventory:[]},'切換潮位，整合符號和顏色。',['tide','read-tide','color','hidden']),
 def(29,'三條繩子的祕密','滑輪結繩章','★★★★',{secured:false,unlocked:false,lowered:false},'依貨箱與平台的規則操作滑輪。',['rope','reset']),
 def(30,'船底的水壓機關','艙底壓力晶','★★★★',{valves:{A:false,B:false,L:true}},'調整閥門，使壓力達到三格。',['valve','activate']),
 def(31,'會說話的信號燈','潮星信號玻璃','★★★★',{signal:[]},'讀取信號表，發送航海光語。',['read-table','read-log','signal','back','clear','send']),
 def(32,'消失的航海日誌','航海日誌殘頁','★★★★',{labels:['none','none','none']},'根據日誌線索配對貨箱和港口。',['read-log','label','check','hidden']),
 def(33,'磁力貨箱迷宮','磁力貨箱章','★★★★',{boxes:{A:[0,0],B:[0,3]},selected:'A',history:[]},'將 A、B 貨箱移至各自目標。',['select','move','undo','reset','check']),
 def(34,'船長的星空望遠鏡','星窗望遠鏡片','★★★★★',{scene:'captain',rings:[0,0,0]},'收集兩處線索，調整望遠鏡符號環。',['go-captain','go-window','read-colors','read-symbols','ring','check']),
 def(35,'墨色密函','深海密函','★★★★★',{scene:'captain',revealed:false,digits:''},'在兩個船艙收集線索，輸入密函密碼。',['go-captain','go-mail','read-order','ink','read-cipher','digit','back','clear','check','hidden']),
 def(36,'潮星號的回航之光','回航星燈芯','★★★★★',{scene:'navigation',route:[],routeDone:false,inventory:[],revealed:false,signal:[],signalDone:false,installedA:false,installedB:false,lit:false},'修復航線、收集鏡片、發送信號並點亮星燈。',['go-navigation','go-cargo','go-bow','go-lamp','read-route','direction','route-check','chest','ink','lens-b','read-signal','signal','back','clear','signal-check','install-a','install-b','light','record'],['return-key','lens-a','lens-b'])
];
export const chapter3Hidden=[{id:'moon-voyage-glass',level:28,name:'月光航海玻璃',desc:'映著雙色潮汐的玻璃。'},{id:'old-navigation-stamp',level:32,name:'舊航海印章',desc:'留存港口記憶的小印章。'},{id:'tidestar-postage',level:35,name:'潮星郵票',desc:'潮星號郵件上的小郵票。'}];
export const chapter3Achievements=[{id:'little-navigator',name:'小小航海家',desc:'完成第 25 關'},{id:'cargo-organizer',name:'貨艙整理師',desc:'完成第 27 關'},{id:'light-communicator',name:'光語通信員',desc:'完成第 31 關'},{id:'magnetic-dispatcher',name:'磁箱調度員',desc:'完成第 33 關'},{id:'chapter-three',name:'第三章完成',desc:'完成第 36 關'},{id:'wreck-collector',name:'沉船拾遺者',desc:'收集第三章全部三件隱藏珍寶'}];
export const clues={
 26:{table:['航海桌方位','航海桌','星＝東、貝殼＝南、船錨＝西、波浪＝北'],log:['航海記錄','航海桌','星 → 貝殼 → 船錨 → 波浪']},
 27:{rules:['貨艙標記','貨艙','左右各兩箱，重量相同；重量 1 的貨箱放左側。']},
 28:{low:['淺潮刻紋','舷窗區','星 → 波浪 → 月亮'],high:['滿潮色記','舷窗區','星＝金、波浪＝青、月亮＝紫']},
 29:{rules:['滑輪操作規則','貨艙','先固定貨箱；解除固定鎖後才能放下平台。']},
 30:{rules:['壓力表說明','船底','A +2、B +1、L −1；目標壓力 3。']},
 31:{table:['信號表','信號台','星＝短長、船錨＝長長、波浪＝長短'],log:['信號記錄','信號台','星 → 船錨 → 波浪']},
 32:{log:['貨箱日誌','貨艙','C 往珊瑚港；A 不往海灣港；B 不往星港；每箱港口不同。']},
 34:{colors:['光色記錄','船長室','藍 → 金 → 紫'],symbols:['觀測窗對照','航海觀測窗','藍＝月亮、金＝船錨、紫＝星星']},
 35:{order:['符號順序','船長室','船錨 → 星 → 波浪 → 貝殼'],cipher:['墨色數字表','郵件保管艙','星＝2、貝殼＝7、波浪＝4、船錨＝9']},
 36:{route:['回航航線圖','航海室','西 → 北 → 東'],signal:['回航信號記錄','船首信號台','星＝短長、波浪＝長短；順序：星 → 波浪']}
};
const add=(a,v)=>{if(!a.includes(v))a.push(v)};const known=(s,id)=>s.notes.includes(id);const discover=(s,id)=>add(s.notes,id);
export function moveBox(s,dir){const d={up:[-1,0],down:[1,0],left:[0,-1],right:[0,1]}[dir];if(!d)return false;const k=s.selected,other=k==='A'?'B':'A',[r,c]=s.boxes[k],next=[r+d[0],c+d[1]];if(next.some(x=>x<0||x>3)||[[1,1],[1,2],[2,2],s.boxes[other]].some(x=>x[0]===next[0]&&x[1]===next[1]))return false;s.history.push({A:[...s.boxes.A],B:[...s.boxes.B]});s.boxes[k]=next;return true}
export function actChapter3(save,id,s,a){let msg='觀察船艙中的線索。',won=false;const inv=s.inventory||[];
 if(a==='hidden'){const item=chapter3Hidden.find(x=>x.level===id);if(item){add(save.hidden,item.id);if(chapter3Hidden.every(x=>save.hidden.includes(x.id)))add(save.achievements,'wreck-collector');msg=`發現 ${item.name}，已加入收藏。`}return {msg,won}}
 if(a.startsWith('read-')){let key=a.slice(5);if(id===28&&key==='tide')key=s.tide;if(id===35&&key==='cipher'&&!s.revealed)return {msg:'先使用墨泡讓數字表顯影。',won};if(clues[id]?.[key]){discover(s,key);msg=`已記錄「${clues[id][key][0]}」。`}return {msg,won}}
 if(a==='ink'){s.revealed=true;if(id===35&&s.scene==='mail')discover(s,'cipher');msg='墨泡散開，隱藏的線索浮現。';return {msg,won}}
 if(id===25){if(a.startsWith('rotate-')){const n=s.nodes.find(x=>x.nodeId===a.slice(7));if(n){n.orientation=(n.orientation+1)%4;msg=mapPath(s).length?'航線已連通！':'碎片轉動了。'}}else if(a==='map-check'){won=mapPath(s).length>0;msg=won?'航線連通了。':'航線仍有斷口。'}}
 if(id===26||id===36&&s.scene==='navigation'){if(a.startsWith('direction-')){let answer=id===26?['E','S','W','N']:['W','N','E'];if(s.sequence?.length>=answer.length||s.route?.length>=answer.length)return {msg:'方向已填滿，可確認或清除。',won};(id===26?s.sequence:s.route).push(a.slice(10));msg='方向已記錄。'}else if(a==='clear'){if(id===26)s.sequence=[];else s.route=[];msg='已清除方向，可重新輸入。'}else if(a==='check'||a==='route-check'){const arr=id===26?s.sequence:s.route,answer=id===26?'E,S,W,N':'W,N,E';if(arr.join(',')!==answer){msg='方向不符，清除後再試。'}else if(id===26){won=known(s,'table')&&known(s,'log');msg=won?'羅盤指向航線。':'先閱讀兩份航海記錄。'}else if(!known(s,'route'))msg='先查看航線圖。';else{s.routeDone=true;add(inv,'return-key');s.inventory=inv;msg='航線恢復，取得回航控制鑰。'}}}
 if(id===27){if(a.startsWith('box-')){const weight=a.slice(4);s.boxes[weight]=({none:'left',left:'right',right:'none'})[s.boxes[weight]];msg='貨箱已移動，可以繼續調整。'}else if(a==='balance'){let left=Object.keys(s.boxes).filter(k=>s.boxes[k]==='left'),right=Object.keys(s.boxes).filter(k=>s.boxes[k]==='right');won=left.length===2&&right.length===2&&left.includes('1')&&left.reduce((x,y)=>x+Number(y),0)===right.reduce((x,y)=>x+Number(y),0);msg=won?'貨艙平衡了。':'確認每側兩箱、等重，且重量 1 在左側。'}}
 if(id===28){if(a==='tide'){s.tide=s.tide==='low'?'high':'low';msg='潮水切換了，已發現的線索保留。'}else if(a.startsWith('color-')){if(!known(s,'low')||!known(s,'high'))msg='先閱讀兩種潮位的刻紋。';else{s.sequence.push(a.slice(6));if(s.sequence.some((x,i)=>x!==['gold','cyan','purple'][i])){s.sequence=[];msg='色序不對，從第一色再試。'}else if(s.sequence.length===3)won=true;else msg='顏色亮起了。'}}}
 if(id===29){if(a==='reset'){s.secured=false;s.unlocked=false;s.lowered=false;msg='滑輪已恢復初始狀態。'}else if(a==='rope-C'){s.secured=true;msg='貨箱固定好了。'}else if(a==='rope-A'){if(!s.secured)msg='先固定貨箱，才能解除鎖。';else{s.unlocked=true;msg='上方固定鎖已解除。'}}else if(a==='rope-B'){if(!s.secured)msg='貨箱尚未固定，不能移動平台。';else if(!s.unlocked)msg='先解除上方固定鎖。';else{s.lowered=true;won=true;msg='平台平穩降下。'}}}
 if(id===30){if(a.startsWith('valve-')){let k=a.slice(6);s.valves[k]=!s.valves[k];msg=`目前壓力 ${pressure(s)} 格。`}else if(a==='activate'){won=pressure(s)===3;msg=won?'裝置啟動了。':`目前 ${pressure(s)} 格，目標是 3 格。`}}
 if(id===31||id===36&&s.scene==='bow'){if(a.startsWith('signal-')&&a!=='signal-check'){if(s.signal.length<(id===31?6:4)){s.signal.push(a.slice(7));msg='信號已記錄。'}else msg='信號已填滿，可刪除或發送。'}else if(a==='back'){s.signal.pop();msg='已刪除最後一段。'}else if(a==='clear'){s.signal=[];msg='已清空信號。'}else if(a==='send'||a==='signal-check'){let expected=id===31?'short,long,long,long,long,short':'short,long,long,short';if(s.signal.join(',')!==expected)msg='信號不符，可刪除或清空後重試。';else if(id===31){won=known(s,'table')&&known(s,'log');msg=won?'信號燈亮了。':'先閱讀信號表與記錄。'}else if(!s.routeDone||!inv.includes('lens-a')||!inv.includes('lens-b'))msg='先恢復航線並收集兩枚鏡片。';else if(!known(s,'signal'))msg='先閱讀本關信號記錄。';else{s.signalDone=true;msg='回航信號已發出，星燈能源啟動。'}}}
 if(id===32){if(a.startsWith('label-')){const i=Number(a.slice(6)),ports=['none','star','coral','bay'];s.labels[i]=ports[(ports.indexOf(s.labels[i])+1)%4];msg='貨箱標籤已調整。'}else if(a==='check'){won=s.labels.join(',')==='star,bay,coral';msg=won?'日誌收藏箱開啟。':'配對尚未正確，請參考日誌。'}}
 if(id===33){if(a.startsWith('select-')){s.selected=a.slice(7);msg=`已選取貨箱 ${s.selected}。`}else if(a.startsWith('move-'))msg=moveBox(s,a.slice(5))?'貨箱移動一格。':'這個方向被障礙、邊界或另一貨箱擋住了。';else if(a==='undo'){const last=s.history.pop();if(last){s.boxes=last;msg='已復原上一步。'}else msg='沒有可復原的移動。'}else if(a==='reset'){s.boxes={A:[0,0],B:[0,3]};s.history=[];s.selected='A';msg='貨箱機關已重置。'}else if(a==='check'){won=s.boxes.A.join(',')==='3,3'&&s.boxes.B.join(',')==='3,0';msg=won?'兩箱抵達目標。':'兩箱尚未全部抵達目標。'}}
 if(id===34||id===35||id===36){if(a.startsWith('go-')){s.scene=a.slice(3);msg='切換區域，線索及物品仍會保留。'}}
 if(id===34){if(a.startsWith('ring-')){const i=+a.slice(-1);s.rings[i]=(s.rings[i]+1)%3;msg='符號環轉動了。'}else if(a==='check'){won=known(s,'colors')&&known(s,'symbols')&&s.rings.join(',')==='0,1,2';msg=won?'望遠鏡對準了星光。':'先查看兩組線索，再調整三個符號環。'}}
 if(id===35){if(a.startsWith('digit-')){if(s.digits.length<4)s.digits+=a.slice(6);msg='數字已輸入。'}else if(a==='back'){s.digits=s.digits.slice(0,-1);msg='已刪除最後一位。'}else if(a==='clear'){s.digits='';msg='密碼已清空。'}else if(a==='check'){won=known(s,'order')&&known(s,'cipher')&&s.digits==='9247';msg=won?'密函打開了。':'密碼不正確，或尚未發現兩份線索。'}}
 if(id===36){if(a==='chest'){if(s.routeDone&&inv.includes('return-key')){add(inv,'lens-a');s.inventory=inv;msg='打開箱子，取得鏡片 A。'}else msg='需要先恢復航線並取得控制鑰。'}else if(a==='lens-b'){if(s.revealed){add(inv,'lens-b');s.inventory=inv;msg='取得隱藏鏡片 B。'}else msg='暗格有微光，試試墨泡。'}else if(a==='install-a'||a==='install-b'){const key='lens-'+a.slice(-1);if(s.routeDone&&s.signalDone&&inv.includes(key)){s[a==='install-a'?'installedA':'installedB']=true;msg='鏡片已裝入星燈。'}else msg='先恢復航線、取得鏡片並發送信號。'}else if(a==='light'){if(s.routeDone&&s.signalDone&&s.installedA&&s.installedB&&inv.includes('lens-a')&&inv.includes('lens-b')){s.lit=true;msg='回航星燈亮起！打開最後的郵運紀錄。'}else msg='確認航線、兩片鏡片及回航信號。'}else if(a==='record'){if(s.lit){won=true;msg='紀錄裡保存著群島居民的祝福與願望。'}else msg='先點亮回航星燈。'}}
 return {msg,won};}
