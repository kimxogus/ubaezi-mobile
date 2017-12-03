const store = {
  name: {
    label: '이름',
    keyboardType: 'default',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  branch: {
    label: '지점',
    keyboardType: 'default',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  call: {
    label: '전화번호',
    keyboardType: 'phone-pad',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  address: {
    label: '주소',
    keyboardType: 'default',
    validate: value => (value && value.length ? null : '데이터가 비어있어요!'),
  },
  timeFrom: {
    label: '영업 시작시간',
    keyboardType: 'numeric',
    validate: value => {
      if (!(value && value.length)) return '데이터가 비어있어요!';
      if (isNaN(+value)) return '숫자를 입력해주세요!';
      if (+value > 48 || +value < 0)
        return '0시부터 48시까지만 입력 가능합니다.';
    },
  },
  timeTo: {
    label: '영업 종료시간',
    keyboardType: 'numeric',
    validate: value => {
      if (!(value && value.length)) return '데이터가 비어있어요!';
      if (isNaN(+value)) return '숫자를 입력해주세요!';
      if (+value > 48 || +value < 0)
        return '0시부터 48시까지만 입력 가능합니다.';
    },
  },
};

export { store };
