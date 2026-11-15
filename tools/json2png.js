// Array (pixel/*.json, rle) -> PNG ohne Python:  node tools/json2png.js pixel/nastja.json pixel/nastja.png
const fs=require('fs'),zlib=require('zlib');const [IN,OUT]=process.argv.slice(2);const o=JSON.parse(fs.readFileSync(IN,'utf8')),W=o.width,H=o.height;
const raw=Buffer.alloc((W*4+1)*H);o.rows.forEach((r,y)=>{let x=0;for(const m of r.matchAll(/(\D)(\d*)/g)){const c=o.palette[m[1]];for(let i=0;i<(+m[2]||1);i++,x++)if(c){const p=y*(W*4+1)+1+x*4;raw[p]=parseInt(c.slice(1,3),16);raw[p+1]=parseInt(c.slice(3,5),16);raw[p+2]=parseInt(c.slice(5,7),16);raw[p+3]=255}}});
const crcT=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;crcT[n]=c>>>0}
const crc=b=>{let c=0xffffffff;for(const v of b)c=crcT[(c^v)&255]^(c>>>8);return(c^0xffffffff)>>>0};
const chunk=(t,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
const ih=Buffer.alloc(13);ih.writeUInt32BE(W,0);ih.writeUInt32BE(H,4);ih[8]=8;ih[9]=6;
fs.writeFileSync(OUT,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]));
