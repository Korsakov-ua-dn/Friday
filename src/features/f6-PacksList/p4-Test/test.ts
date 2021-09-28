class Test {
    private name: string;
    public constructor(nameCardsPack: string) {
        this.name = nameCardsPack;
    }
}

const testData = [
    new Test("courseHtml"),
    new Test("courseJs"),
    new Test("courseVue"),
    new Test("English cards"),
    new Test("Museum cards"),
    new Test("How City by Foto"),
    new Test("Now stop and begin"),
    new Test("Paris cards"),
    new Test("Учим математику"),
    new Test("Учим русский"),
    new Test("Учим историю"),
    new Test("Some cards"),
    new Test("И все такое"),

];

function getRandomTest(int: number) {
    return Math.floor(Math.random() * int);
}

export const setTestData = () => {
    const rnd = getRandomTest(testData.length);
    const rndName = testData[rnd];
    return rndName;
};
