abstract class CustomModel<T> {
  // 직렬화용 JSON 객체를 반환해야 한다.
  abstract toJSON(): T;
  // 자기 자신을 복제한 새 인스턴스를 반환해야 한다.
  abstract clone(props?: Partial<T>): CustomModel<T>;
}

export default CustomModel;
