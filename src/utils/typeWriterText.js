
export default function typeWriter(ref, strings, i = 0, done = false, index = 0) {
  let speed = 150;
  let randomSpeed = 100;
  // const values = [speed, speed, speed, speed, 200, speed, 300, speed, 400, speed, speed];


  // var hit = new Audio('typewriter_hit.wav');
  // var ret = new Audio('typewriter_return.wav');

  if (i < strings[index].length && done === false) {

    // try {
    //   hit.play();
    // } catch (error) {
    // }

    ref.innerHTML += strings[index].charAt(i);
    i++;
    done = Boolean(i == strings[index].length);
    
    speed = i == strings[index].length ? 2000 : 100;
    // let randomSpeed = Math.floor(Math.random() * (values.length - 1));
    // speed = i == strings[index].length ? 2000 : values[randomSpeed];
    // if (i == strings[index].length) {
    //   setTimeout(() => {
    //     try {
    //       ret.play();
    //     } catch (error) {
    //     }
    //   }, speed / 1.8)
    // }

    setTimeout(() => {
      typeWriter(ref, strings, i, done, index);
    }, speed)

  } else {
    ref.innerHTML = ref.innerHTML.substring(0, ref.innerHTML.length - 1);
    i--;

    if (i == 0) {
      done = false;
      index++;
      if (index == strings.length)
        index = 0;
    }

    setTimeout(() => {
      typeWriter(ref, strings, i, done, index);
    }, 50)
  }
}
