/**
 * 窗口尺寸变化
 * @returns 
 */
export function useWindowSize() {
  const bodyWidth = ref(0);
  const bodyHeight = ref(0);

  const getSize = () => {
    bodyWidth.value = document.body.clientWidth;
    bodyHeight.value = document.body.clientHeight;
    // console.log("window size:", bodyWidth.value, bodyHeight.value);
  }

  onMounted(() => {
    getSize();
    // window.addEventListener("resize", getSize);
    window.onresize = () => {
      getSize();
    };
  });
  // onMounted(() => {
  //   window.removeEventListener("resize", getSize);
  // });


  return { bodyWidth, bodyHeight };
}
