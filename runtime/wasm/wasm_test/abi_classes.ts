enum IndexForAscTypeId {
  STRING = 0,
  ARRAY_BUFFER = 1,
  UINT8_ARRAY = 6,
  ARRAY_STRING = 18,
}

export function id_of_type(type_id_index: IndexForAscTypeId): usize {
  switch (type_id_index) {
    case IndexForAscTypeId.STRING:
      return idof<string>();
    case IndexForAscTypeId.ARRAY_BUFFER:
      return idof<ArrayBuffer>();
    case IndexForAscTypeId.UINT8_ARRAY:
      return idof<Uint8Array>();
    case IndexForAscTypeId.ARRAY_STRING:
      return idof<Array<string>>();
    default:
      return 0;
  }
}

export function allocate(n: usize): usize {
  return __alloc(n);
}

// Sequence of 20 `u8`s.
type Address = Uint8Array;

// const array_buffer_header_size = 8;
const array_buffer_header_size = 20;

// Clone the address to a new buffer, add 1 to the first and last bytes of the
// address and return the new address.
export function test_address(address: Address): Address {
  let new_address = address.subarray();

  // Add 1 to the first and last byte.
  new_address[0] += 1;
  new_address[address.length - 1] += 1;

  return new_address
}

// Sequence of 32 `u8`s.
type Uint = Uint8Array;

// Clone the Uint to a new buffer, add 1 to the first and last `u8`s and return
// the new Uint.
export function test_uint(address: Uint): Uint {
  let new_address = address.subarray();

  // Add 1 to the first byte.
  new_address[0] += 1;

  return new_address
}

// Return the string repeated twice.
export function repeat_twice(original: string): string {
  return original.repeat(2)
}

// Sequences of `u8`s.
type FixedBytes = Uint8Array;
type Bytes = Uint8Array;

// Concatenate two byte sequences into a new one.
export function concat(bytes1: Bytes, bytes2: FixedBytes): Bytes {
  let concated_buff = new ArrayBuffer(bytes1.byteLength + bytes2.byteLength);
  let concated_buff_ptr = changetype<usize>(concated_buff);

  let bytes1_ptr = changetype<usize>(bytes1);
  let bytes1_buff_ptr = load<usize>(bytes1_ptr);

  let bytes2_ptr = changetype<usize>(bytes2);
  let bytes2_buff_ptr = load<usize>(bytes2_ptr);

  // Move bytes1.
  memory.copy(concated_buff_ptr, bytes1_buff_ptr, bytes1.byteLength);
  concated_buff_ptr += bytes1.byteLength

  // Move bytes2.
  memory.copy(concated_buff_ptr, bytes2_buff_ptr, bytes2.byteLength);

  let new_typed_array = Uint8Array.wrap(concated_buff);

  return new_typed_array;
}

// export function test_array(strings: Array<string>): Array<string> {
//   strings.push("5");
//   return strings
// }
enum ValueKind {
    STRING = 0,
    INT = 1,
    BIG_DECIMAL = 2,
    BOOL = 3,
    ARRAY = 4,
    NULL = 5,
    BYTES = 6,
    BIG_INT = 7,
}

// Big enough to fit any pointer or native `this.data`.
type Payload = u64
export class Value {
    kind: ValueKind
    data: Payload
}

// export function test_array(strings: Array<string>): Value {
export function test_array(strings: Array<string>): Array<string> {
// export function test_array(strings: Uint8Array): Value {
  // let test: Uint32Array = new Uint32Array(4);
  // test[0] = 1
  // test[1] = 2
  // test[2] = 3
  // test[3] = 4
  // let abc: string = "abc"
  let arr: Array<string> = ["6", "7", "8", "9"] 
  // let xyz: string = "xyz"

  // arr.push("9")
  // let arr: Array<string> = ["1", "2", "3", "4"] 
  // arr.push("6")
  // let arr: Uint8Array = new Uint8Array(4);
  // arr[0] = 6
  // arr[1] = 7
  // arr[2] = 8
  // arr[3] = 9
  strings.push("5");// out of bounds :/
  // return strings[4]
  // let value = new Value();
  // value.kind = ValueKind.BYTES;
  // value.data = arr[3]
  // value.data = changetype<u32>(strings)
  // value.data = strings.length
  // value.data = arr.length
  // return value
  // return arr
  return strings
}

export function byte_array_third_quarter(bytes: Uint8Array): Uint8Array {
  // let t: Uint8Array = new Uint8Array(1);
  // t[0] = 3
  // return t
  // let buff = new ArrayBuffer(4);
  // buff[0] = 5
  // buff[1] = 6
  // buff[2] = 7
  // buff[3] = 8

  // let t: Uint8Array = Uint8Array.wrap(buff);

  // let t: Uint8Array = new Uint8Array(4);
  // t[0] = 5
  // t[1] = 6
  // t[2] = 7
  // t[3] = 8

  // return bytes
  // 4 * 2 / 4 = 2, 4 * 3 / 4
  // 2, 3 -> only get third element, end non inclusive
  return bytes.subarray(bytes.length * 2/4, bytes.length * 3/4)
  // return t.subarray(2, 3)
  // return bytes.subarray(2, 3)
  // return t.subarray(t.length * 2/4, t.length * 3/4)
  // return t.subarray()
  // return bytes.subarray(1)
}
