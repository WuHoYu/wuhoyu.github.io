// Utilities for dynamic background colors based on slider value

export function lerpColor(a, b, t) {
  a = a.replace('#', ''); b = b.replace('#', '');
  if (a.length === 3) a = a.split('').map(x => x + x).join('');
  if (b.length === 3) b = b.split('').map(x => x + x).join('');
  const ah = [parseInt(a.substr(0,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(4,2),16)];
  const bh = [parseInt(b.substr(0,2),16),parseInt(b.substr(2,2),16),parseInt(b.substr(4,2),16)];
  const rh = ah.map((v,i)=>Math.round(v+(bh[i]-v)*t));
  return `#${rh.map(x=>x.toString(16).padStart(2,'0')).join('')}`;
}

export function getBackgroundColor(val) {
  if (val <= 15) {
    const t = Math.pow(val/15, 2.5);
    return lerpColor('#e1f4dfff', '#e9eaf2', t);
  }
  if (val > 15 && val <= 25) {
    const t = Math.pow((val-15)/10, 2.5);
    return lerpColor('#e9eaf2', '#ffffff', t);
  }
  if (val > 25 && val <= 40) {
    return '#ffffff';
  }
  if (val > 40 && val <= 45) {
    const t = (val-40)/5;
    return lerpColor('#ffffff', '#f7d7a4', t);
  }
  if (val > 45 && val <= 48) {
    const t = (val-45)/3;
    return lerpColor('#f7d7a4', '#f9ae16', t);
  }
  if (val > 48 && val <= 51) {
    const t = (val-48)/3;
    return lerpColor('#f9ae16', '#f57f20', t);
  }
  if (val > 51 && val <= 53) {
    const t = (val-51)/2;
    return lerpColor('#f57f20', '#e2620c', t);
  }
  if (val > 53 && val <= 55) {
    const t = (val-53)/2;
    return lerpColor('#e2620c', '#f21414', t);
  }
  if (val > 55 && val <= 70) {
    const t = (val-55)/15;
    return lerpColor('#f21414', '#7e235d', t);
  }
  if (val > 70 && val <= 85) {
    const t = (val-70)/15;
    return lerpColor('#7e235d', '#4f1d6e', t);
  }
  if (val > 85 && val <= 100) {
    const t = (val-85)/15;
    return lerpColor('#4f1d6e', '#1b1a1e', t);
  }
  return '#1b1a1e';
}
