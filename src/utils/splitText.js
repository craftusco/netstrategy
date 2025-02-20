export default function splitText(string) {
  return string ? string.split(/\r?\n/).map((e, i) => <span key={i}>{`${e} `}</span>) : '';
}
