import type { TheoryTopic } from '../types';

export const theoryData: TheoryTopic[] = [
  {
    id: 'word-form',
    title: 'Từ loại',
    englishTitle: 'Word Form',
    description: 'Phân biệt danh từ, động từ, tính từ và trạng từ trong câu.',
    level: 'Cơ bản',
    sections: [
      {
        title: 'Khái quát về Từ loại',
        type: 'explanation',
        content: 'Trong tiếng Anh, 4 từ loại quan trọng nhất thường xuyên xuất hiện trong TOEIC Part 5 là: Noun (Danh từ), Verb (Động từ), Adjective (Tính từ) và Adverb (Trạng từ). Nhận biết đúng đuôi từ và vị trí của chúng giúp bạn làm đúng 20-30% câu hỏi.'
      },
      {
        title: 'Dấu hiệu nhận biết (Hậu tố)',
        type: 'table',
        headers: ['Từ loại', 'Các hậu tố thường gặp', 'Ví dụ'],
        rows: [
          ['Noun (Chỉ vật)', '-tion, -ment, -ness, -ity, -ance, -ence', 'information, development, happiness, security, importance'],
          ['Noun (Chỉ người)', '-er, -or, -ist, -ee, -ant', 'employer, actor, scientist, employee, assistant'],
          ['Adjective', '-ful, -less, -ous, -ive, -able, -ible, -al, -ic', 'beautiful, careless, dangerous, active, acceptable, natural, economic'],
          ['Adverb', '-ly (thường là Adj + ly)', 'carefully, beautifully, quickly']
        ]
      },
      {
        title: 'Vị trí của Danh từ',
        type: 'formula',
        content: 'Article (a/an/the) / Tính từ sở hữu / Tính từ chỉ định + (Adjective) + NOUN'
      },
      {
        title: 'Bẫy TOEIC thường gặp',
        type: 'trap',
        content: 'Nhiều từ kết thúc bằng -al nhưng lại là Danh từ chứ không phải Tính từ: approval (sự phê duyệt), proposal (bản đề xuất), disposal (sự vứt bỏ), professional (chuyên gia).'
      },
      {
        title: 'Ví dụ minh họa',
        type: 'example',
        question: 'The management team requires your _____ before proceeding with the new project.',
        options: ['approve', 'approved', 'approval', 'approvingly'],
        answer: 'approval',
        explanation: 'Sau tính từ sở hữu "your" cần một Danh từ. Từ "approval" kết thúc bằng đuôi -al là một danh từ đặc biệt mang nghĩa "sự phê duyệt".'
      }
    ]
  },
  {
    id: 'linking-verbs',
    title: 'Động từ nối',
    englishTitle: 'Linking Verbs',
    description: 'Nhóm động từ đặc biệt không đi với trạng từ mà đi với tính từ.',
    level: 'Cơ bản',
    sections: [
      {
        title: 'Khái niệm',
        type: 'explanation',
        content: 'Linking verb (động từ nối) không mô tả hành động mà liên kết chủ ngữ với trạng thái hoặc đặc điểm của chủ ngữ. Vì vậy, theo sau linking verb thường là một TÍNH TỪ (Adjective) hoặc DANH TỪ (Noun), không dùng Trạng từ (Adverb).'
      },
      {
        title: 'Công thức chung',
        type: 'formula',
        content: 'S + Linking Verb + ADJECTIVE'
      },
      {
        title: 'Các linking verbs thường gặp',
        type: 'table',
        headers: ['Linking Verb', 'Nghĩa', 'Ví dụ'],
        rows: [
          ['be', 'thì, là, ở', 'It is important.'],
          ['seem', 'có vẻ như', 'He seems tired.'],
          ['become / get', 'trở nên', 'The weather became cold.'],
          ['remain / stay', 'duy trì, vẫn', 'Please remain calm.'],
          ['appear / look', 'trông có vẻ', 'The product looks expensive.'],
          ['feel / sound', 'cảm thấy / nghe có vẻ', 'It sounds reasonable.']
        ]
      },
      {
        title: 'Ghi nhớ (Note)',
        type: 'note',
        content: 'Một số động từ vừa là Động từ nối (đi với Adj), vừa là Động từ thường (đi với Adv). Ví dụ: "Look" trong "He looks happy" (Anh ấy trông có vẻ hạnh phúc - linking verb) nhưng trong "He looks carefully at the picture" (Anh ấy nhìn bức tranh một cách cẩn thận - action verb).'
      },
      {
        title: 'Bẫy TOEIC',
        type: 'trap',
        content: 'Đề bài rất hay đánh lừa bằng cách cho một chỗ trống sau Linking Verb và đưa ra các đáp án Adverb (đuôi -ly). Hãy tỉnh táo chọn Adjective!'
      },
      {
        title: 'Ví dụ TOEIC',
        type: 'example',
        question: 'The new financial system remains _____ despite the recent software updates.',
        options: ['stable', 'stably', 'stability', 'stabilize'],
        answer: 'stable',
        explanation: '"remains" là một linking verb. Do đó, từ cần điền phải là một tính từ (Adjective) mô tả trạng thái của hệ thống. Đáp án A là tính từ.'
      }
    ]
  },
  {
    id: 'prepositions',
    title: 'Giới từ',
    englishTitle: 'Prepositions',
    description: 'Các cấu trúc giới từ thường gặp và cách sử dụng V-ing sau giới từ.',
    level: 'Trung bình',
    sections: [
      {
        title: 'Quy tắc cơ bản',
        type: 'formula',
        content: 'Preposition (Giới từ) + Noun / V-ing / Noun Phrase'
      },
      {
        title: 'Các tính từ đi kèm giới từ (Collocations)',
        type: 'table',
        headers: ['Cấu trúc', 'Ý nghĩa'],
        rows: [
          ['interested in', 'quan tâm đến'],
          ['responsible for', 'chịu trách nhiệm về'],
          ['capable of', 'có khả năng làm gì'],
          ['familiar with', 'quen thuộc với'],
          ['focused on', 'tập trung vào'],
          ['good at', 'giỏi về'],
          ['committed to', 'cam kết làm gì']
        ]
      },
      {
        title: 'Lưu ý cực kỳ quan trọng',
        type: 'trap',
        content: 'Bẫy TOEIC cực kỳ phổ biến: Đa số trường hợp chữ "to" là một phần của "to V" (Infinitive). Tuy nhiên, trong các cụm như "be committed to", "look forward to", "object to", "be accustomed to", thì "to" ở đây là GIỚI TỪ. Do đó, phải dùng V-ing hoặc Noun theo sau.'
      },
      {
        title: 'Ví dụ',
        type: 'example',
        question: 'We look forward to _____ your response regarding the contract.',
        options: ['receive', 'received', 'receiving', 'reception'],
        answer: 'receiving',
        explanation: 'Trong cụm "look forward to", chữ "to" là giới từ. Vì vậy, ta phải dùng V-ing (receiving) theo sau nó.'
      }
    ]
  },
  {
    id: 'gerund-infinitive',
    title: 'V-ing và To V',
    englishTitle: 'Gerund & Infinitive',
    description: 'Nhận biết khi nào sử dụng V-ing và khi nào sử dụng To V sau động từ.',
    level: 'Trung bình',
    sections: [
      {
        title: 'Verb + V-ing (Gerund)',
        type: 'table',
        headers: ['Động từ', 'Nghĩa'],
        rows: [
          ['enjoy', 'thích thú'],
          ['avoid', 'tránh'],
          ['finish / complete', 'hoàn thành'],
          ['consider', 'cân nhắc'],
          ['suggest / recommend', 'đề xuất / gợi ý'],
          ['mind', 'phiền'],
          ['postpone / delay', 'trì hoãn']
        ]
      },
      {
        title: 'Verb + To V (Infinitive)',
        type: 'table',
        headers: ['Động từ', 'Nghĩa'],
        rows: [
          ['want / need', 'muốn / cần'],
          ['plan / intend', 'lên kế hoạch / dự định'],
          ['decide', 'quyết định'],
          ['hope / expect', 'hy vọng / mong đợi'],
          ['promise', 'hứa'],
          ['offer', 'đề nghị (giúp đỡ)']
        ]
      },
      {
        title: 'Ví dụ TOEIC',
        type: 'example',
        question: 'The board of directors is considering _____ a new branch in Tokyo.',
        options: ['open', 'to open', 'opening', 'opened'],
        answer: 'opening',
        explanation: 'Động từ "consider" (cân nhắc) luôn yêu cầu một V-ing (Gerund) theo sau. Do đó, đáp án đúng là "opening".'
      }
    ]
  },
  {
    id: 'despite-although',
    title: 'Mặc dù (Concession)',
    englishTitle: 'Despite / Although',
    description: 'Phân biệt cách dùng các từ chỉ sự nhượng bộ (Mặc dù).',
    level: 'Cơ bản',
    sections: [
      {
        title: 'Bảng cấu trúc',
        type: 'table',
        headers: ['Từ nối', 'Cấu trúc theo sau', 'Ví dụ'],
        rows: [
          ['Although / Even though / Though', 'S + V (Mệnh đề)', 'Although it rained heavily,...'],
          ['Despite / In spite of', 'Noun / V-ing (Cụm từ)', 'Despite the heavy rain,...']
        ]
      },
      {
        title: 'Bẫy thường gặp',
        type: 'trap',
        content: 'TOEIC thường kiểm tra việc phân biệt giữa Although (cần mệnh đề) và Despite (cần danh từ). Cần quan sát ngay sau ô trống là một Câu hoàn chỉnh (S+V) hay chỉ là Một cụm danh từ (Noun phrase).'
      },
      {
        title: 'Ví dụ',
        type: 'example',
        question: '_____ the bad weather, the outdoor concert was completely sold out.',
        options: ['Although', 'Despite', 'Even though', 'While'],
        answer: 'Despite',
        explanation: '"the bad weather" chỉ là một Cụm danh từ (Noun phrase), không có động từ được chia. Do đó ta phải dùng "Despite", không dùng "Although".'
      }
    ]
  },
  {
    id: 'because-because-of',
    title: 'Bởi vì (Reason)',
    englishTitle: 'Because / Because of',
    description: 'Phân biệt cách dùng các từ chỉ lý do (Bởi vì).',
    level: 'Cơ bản',
    sections: [
      {
        title: 'Bảng cấu trúc',
        type: 'table',
        headers: ['Từ nối', 'Cấu trúc theo sau', 'Ví dụ'],
        rows: [
          ['Because / Since / As', 'S + V (Mệnh đề)', 'Because he was late,...'],
          ['Because of / Due to / Owing to', 'Noun / V-ing (Cụm từ)', 'Due to the heavy traffic,...']
        ]
      },
      {
        title: 'Ví dụ TOEIC',
        type: 'example',
        question: 'The flight was delayed _____ a severe mechanical problem.',
        options: ['because', 'since', 'due to', 'as'],
        answer: 'due to',
        explanation: '"a severe mechanical problem" là cụm danh từ, do đó phải dùng "due to" (hoặc because of). Các từ còn lại yêu cầu một mệnh đề S+V.'
      }
    ]
  },
  {
    id: 'relative-clauses',
    title: 'Mệnh đề quan hệ',
    englishTitle: 'Relative Clauses',
    description: 'Cách sử dụng Who, Whom, Which, That, Whose.',
    level: 'Trung bình',
    sections: [
      {
        title: 'Cách sử dụng cơ bản',
        type: 'table',
        headers: ['Đại từ', 'Thay thế cho', 'Vai trò'],
        rows: [
          ['Who', 'Người', 'Chủ ngữ (hoặc tân ngữ)'],
          ['Whom', 'Người', 'Tân ngữ'],
          ['Which', 'Vật', 'Chủ ngữ / Tân ngữ'],
          ['That', 'Người / Vật', 'Chủ ngữ / Tân ngữ (Không dùng sau dấu phẩy)'],
          ['Whose', 'Sở hữu', 'Đứng trước Noun (của ai/cái gì)']
        ]
      },
      {
        title: 'Mệnh đề quan hệ rút gọn (Reduced Relative Clauses)',
        type: 'formula',
        content: 'Chủ động (who/which + be + V-ing) ➔ Rút gọn thành: V-ing\nBị động (who/which + be + V3) ➔ Rút gọn thành: V3/V-ed'
      },
      {
        title: 'Ví dụ Rút gọn',
        type: 'note',
        content: 'Employees who are working here ➔ Employees working here.\nProducts which are made in Japan ➔ Products made in Japan.'
      },
      {
        title: 'Ví dụ TOEIC',
        type: 'example',
        question: 'Any passengers _____ luggage is overweight must pay an additional fee.',
        options: ['who', 'whom', 'whose', 'which'],
        answer: 'whose',
        explanation: 'Ta thấy có danh từ "luggage" phía sau ô trống. Cần một đại từ chỉ sự sở hữu (Hành khách mà hành lý CỦA HỌ bị quá ký...). Đáp án là whose.'
      }
    ]
  },
  {
    id: 'subject-verb-agreement',
    title: 'Sự hòa hợp Chủ ngữ - Động từ',
    englishTitle: 'Subject-Verb Agreement',
    description: 'Quy tắc chia động từ số ít, số nhiều theo chủ ngữ.',
    level: 'Trung bình',
    sections: [
      {
        title: 'Quy tắc Số ít',
        type: 'explanation',
        content: 'Các đại từ bất định như: everyone, everybody, someone, somebody, anyone, nobody, everything... luôn luôn đi với ĐỘNG TỪ SỐ ÍT. Ngoài ra, "Each + Noun" và "Every + Noun" cũng đi với động từ số ít.'
      },
      {
        title: 'Either / Neither / Not only',
        type: 'table',
        headers: ['Cấu trúc', 'Chia động từ theo'],
        rows: [
          ['Either A or B', 'Chia theo B (Chủ ngữ gần động từ nhất)'],
          ['Neither A nor B', 'Chia theo B'],
          ['Not only A but also B', 'Chia theo B'],
          ['A as well as B', 'Chia theo A (Chủ ngữ đầu tiên)'],
          ['A along with B', 'Chia theo A']
        ]
      },
      {
        title: 'Ví dụ',
        type: 'example',
        question: 'Neither the manager nor the employees _____ informed of the schedule change.',
        options: ['was', 'were', 'has', 'is'],
        answer: 'were',
        explanation: 'Cấu trúc "Neither A nor B", động từ chia theo B. B ở đây là "the employees" (số nhiều), nên ta dùng "were" (bị động quá khứ "were informed").'
      }
    ]
  }
];
