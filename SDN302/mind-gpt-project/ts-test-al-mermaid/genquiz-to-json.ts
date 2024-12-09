import { TypeSelectAnswer, Quiz } from "./constant";

const parseQuestions = (data: string): Quiz[] => {
  const questions = data.trim().split("\n\n");
  const quizList: Quiz[] = [];

  questions.forEach((questionText, index) => {
    const lines = questionText.trim().split("\n");
    const question = lines[0].replace(/^###\s*/, "").trim();
    const answers = lines.slice(1).map((line) => line.replace(/^-/, "").trim());

    const quiz: Quiz = {
      question: question,
      answers: [
        { key: TypeSelectAnswer.A, value: answers[0] },
        { key: TypeSelectAnswer.B, value: answers[1] },
        { key: TypeSelectAnswer.C, value: answers[2] },
        { key: TypeSelectAnswer.D, value: answers[3] },
      ],
      correctAnswer: "A", 
    };

    quizList.push(quiz);
  });

  return quizList;
};

const questionData = `
### Ngành nào thuộc khối công nghệ tại Đại học FPT? 🏫
- Quản trị kinh doanh
- Thiết kế đồ họa
- Ngành Truyền thông đa phương tiện
- Công nghệ thông tin

### Đại học FPT có chương trình hoạt động gì giúp sinh viên phát triển kỹ năng mềm? 🌐
- Thực tập
- Chương trình trao đổi sinh viên
- Kết nối doanh nghiệp
- Dự án thực tế

### Khi theo học ngành Truyền thông đa phương tiện tại Đại học FPT, sinh viên có thể tham gia cơ hội việc làm nào? 🎓
- Chương trình trao đổi sinh viên
- Thực tập
- Câu lạc bộ
- Kế hoạch học tập

### Sinh viên ngành Quản trị kinh doanh tại Đại học FPT cần chuẩn bị gì cho kế hoạch học tập? 📚
- Kết nối doanh nghiệp
- Dự án thực tế
- Hoạt động ngoại khóa
- Chương trình trao đổi sinh viên

### Câu lạc bộ tại Đại học FPT thuộc danh mục nào của trường? 🎭
- Cơ hội việc làm
- Ngành học
- Hoạt động ngoại khóa
- Chương trình đào tạo
`;

const quizzes = parseQuestions(questionData);

console.log(JSON.stringify(quizzes, null, 2));
