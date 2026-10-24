/* Pure layout helper. No persistence, network, OCR or image access. */
(function(root){
function speedResultRegions(data,width,height){
 const words=[];
 for(const block of data.blocks||[])for(const paragraph of block.paragraphs||[])for(const line of paragraph.lines||[])for(const word of line.words||[])if(word.bbox)words.push(word);
 const clean=t=>String(t||'').replace(/[^a-z]/gi,'').toLowerCase();
 const downs=words.filter(w=>clean(w.text)==='download'&&w.confidence>=70);
 const ups=words.filter(w=>clean(w.text)==='upload'&&w.confidence>=70);
 const units=words.filter(w=>clean(w.text)==='mbps'&&w.confidence>=70);
 for(const d of downs)for(const u of ups){
  const dh=d.bbox.y1-d.bbox.y0,uh=u.bbox.y1-u.bbox.y0,h=Math.min(dh,uh);
  if(h<5||d.bbox.x1>=u.bbox.x0||Math.abs(d.bbox.y0-u.bbox.y0)>h*.75)continue;
  const mid=(d.bbox.x1+u.bbox.x0)/2;
  const candidates=[d,u].map((a,i)=>units.filter(m=>m.bbox.y0>a.bbox.y1&&m.bbox.y0-a.bbox.y1<height*.2&&(i===0?m.bbox.x0<mid:m.bbox.x0>mid)&&m.bbox.x1>=a.bbox.x0).sort((a,b)=>a.bbox.y0-b.bbox.y0)[0]);
  if(candidates.some(x=>!x))continue;
  if(Math.abs(candidates[0].bbox.y0-candidates[1].bbox.y0)>h)continue;
  const unitY=Math.min(...candidates.map(x=>x.bbox.y0)),rowBottom=Math.min(d.bbox.y1,u.bbox.y1),gap=unitY-rowBottom;
  if(gap<h*2||gap>h*12)continue;
  const y=Math.round(rowBottom+gap*.11),bottom=Math.round(unitY-gap*.11);
  const regions=[d,u].map((a,i)=>{const x=Math.max(0,Math.round(a.bbox.x0-h)),right=Math.min(width,Math.round(candidates[i].bbox.x1+h*.38));return {kind:i?'up':'down',x,y,width:right-x,height:bottom-y}});
  if(regions.some(r=>r.width<=0||r.height<=0||r.y<0||r.y+r.height>height)||regions[0].x+regions[0].width>=regions[1].x)continue;
  return regions;
 }
 return [];
}
if(typeof module!=='undefined')module.exports=speedResultRegions;else root.speedResultRegions=speedResultRegions;
})(typeof window==='undefined'?{}:window);
