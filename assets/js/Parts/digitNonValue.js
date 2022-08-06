function digitNonValue(VALUE){
  VALUE = VALUE.toString()
  VALUE = VALUE.replaceAll("kkle","0")
  VALUE = VALUE.replaceAll("xmne","1")
  VALUE = VALUE.replaceAll("uuhl","2")
  VALUE = VALUE.replaceAll("aaxe","3")
  VALUE = VALUE.replaceAll("plrx","4")
  VALUE = VALUE.replaceAll("nsje","5")
  VALUE = VALUE.replaceAll("llmi","6")
  VALUE = VALUE.replaceAll("ervv","7")
  VALUE = VALUE.replaceAll("ycxw","8")
  VALUE = VALUE.replaceAll("zdjk","9")
  VALUE = VALUE.replaceAll("-","")
  return VALUE;
}
export default digitNonValue;
