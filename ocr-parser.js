/* Only supported signal fields are returned. Raw text and personal identifiers are never retained. */
(function(root){
function parseSignalText(text){
 const lines=String(text).replace(/[−–—]/g,'-').replace(/\r/g,'').split('\n').map(s=>s.trim()).filter(Boolean);
 let blocks=[],current={network:'',lines:[]};
 for(const line of lines){const heading=line.match(/^[^A-Za-z0-9]*(LTE|5G|NR)[^A-Za-z0-9]*$/i);if(heading){if(current.lines.length)blocks.push(current);current={network:heading[1].toUpperCase()==='LTE'?'LTE':'5G',lines:[]}}else current.lines.push(line)}
 blocks.push(current);
 const candidates=[];
 for(const block of blocks){const values={},warnings=[];let duplicate=false;
 for(let i=0;i<block.lines.length;i++){const line=block.lines[i];const m=line.match(/\b((?:SS[-\s]*|CSI[-\s]*)?RSRP|RSRQ|SNR|SINR)\b\s*[:=]?\s*(.*)$/i);if(m){if(/CSI/i.test(m[1])){warnings.push('CSI-RSRP was skipped. Use SS-RSRP consistently for 5G.');continue}const k=/RSRP/i.test(m[1])?'rsrp':/RSRQ/i.test(m[1])?'rsrq':'snr';const remainder=m[2]||block.lines[i+1]||'';const n=remainder.match(/^\s*([+-]?\d+(?:[.,]\d+)?)(?:\s|$|dB)/i);if(!n)continue;const v=Number(n[1].replace(',','.'));const range={rsrp:[-160,-20],rsrq:[-50,10],snr:[-50,60]}[k];if(v<range[0]||v>range[1]){warnings.push(k.toUpperCase()+' was outside the supported range; enter it manually.');continue}if(values[k]!==undefined){duplicate=true;continue}values[k]=v;if(/SINR/i.test(m[1]))warnings.push('Screenshot says SINR. Confirm this matches the quality metric you intend to track.');}
 const band=line.match(/\bBand\b(?!width)\s*[:=]?\s*([Bn]\s*\d+(?:\s*\/\s*\d+)*)(?:\s|$)/i);if(band&&!values.band)values.band=band[1].replace(/\s/g,'');}
 if(Object.keys(values).length){if(duplicate)warnings.push('Repeated metric labels found in this section; verify that all values belong to the same cell.');if(!block.network)warnings.push('Network section could not be identified. Choose LTE or 5G yourself; the status-bar icon is not evidence.');if(block.network==='5G')warnings.push('For 5G, confirm these are SS measurements, not CSI measurements.');candidates.push({network:block.network,values,warnings})}
 }
 return candidates.sort((a,b)=>Number(b.values.rsrp!==undefined)-Number(a.values.rsrp!==undefined));
}
if(typeof module!=='undefined'&&module.exports)module.exports={parseSignalText};else root.parseSignalText=parseSignalText;
})(typeof window!=='undefined'?window:this);
