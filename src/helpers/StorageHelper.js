const getString = (key) => {
    return sessionStorage.getItem(key) || '';
};

const setString = (key, value) => {
    sessionStorage.setItem(key, value);
};

const getArray = (key) => {
    return JSON.parse(sessionStorage.getItem(key) || '[]');
};

const setArray = (key, array) => {
    sessionStorage.setItem(key, JSON.stringify(array));
};

const pushOnArray = (key, element) => {
    const array = getArray(key);
    array.push(element);
    setArray(key, array);
};

const getNumber = (key) => {
    return Number(sessionStorage.getItem(key) || '0');
};

const setNumber = (key, value) => {
    sessionStorage.setItem(key, `${value}`);
};

const incrementNumber = (key, howMany= 1) => {
    const number = getNumber(key);
    setNumber(key, number+howMany);
};

const decrementNumber = (key, howMany= 1) => {
    const number = getNumber(key);
    setNumber(key, number-howMany);
};

export default { decrementNumber, getArray, getNumber, getString, incrementNumber, pushOnArray, setArray, setNumber, setString };
