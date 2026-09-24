import type { TheorySection } from '../types';

/* =============================================
   Các hộp nội dung đặc biệt cho Lý thuyết
   ============================================= */

// 1. Khung Công thức (Formula)
export function FormulaBox({ content }: { content: string }) {
  return (
    <div style={{ background: '#e0e7ff', borderLeft: '4px solid #4f46e5', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3730a3', fontWeight: 'bold', marginBottom: '8px' }}>
        <span>📐</span> CÔNG THỨC
      </div>
      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', whiteSpace: 'pre-line' }}>
        {content}
      </div>
    </div>
  );
}

// 2. Khung Bẫy (Trap)
export function TrapBox({ content }: { content: string }) {
  return (
    <div style={{ background: '#fee2e2', borderLeft: '4px solid #ef4444', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontWeight: 'bold', marginBottom: '8px' }}>
        <span>⚠️</span> BẪY TOEIC
      </div>
      <div style={{ color: '#7f1d1d' }}>{content}</div>
    </div>
  );
}

// 3. Khung Ghi chú (Note)
export function NoteBox({ content }: { content: string }) {
  return (
    <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e', fontWeight: 'bold', marginBottom: '8px' }}>
        <span>💡</span> GHI NHỚ
      </div>
      <div style={{ color: '#78350f', whiteSpace: 'pre-line' }}>{content}</div>
    </div>
  );
}

// 4. Bảng (Table)
export function TheoryTable({ section }: { section: TheorySection }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ background: '#f3f4f6' }}>
          <tr>
            {section.headers?.map((h, i) => (
              <th key={i} style={{ padding: '12px 16px', fontWeight: 'bold', color: '#374151', borderBottom: '2px solid #e5e7eb' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows?.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '12px 16px', color: '#4b5563' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 5. Khung Ví dụ trắc nghiệm (Example)
export function ExampleBox({ section }: { section: TheorySection }) {
  return (
    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontWeight: 'bold', marginBottom: '12px' }}>
        <span>🎯</span> VÍ DỤ MINH HỌA
      </div>
      <div style={{ fontWeight: '600', marginBottom: '16px', fontSize: '1.05rem' }}>{section.question}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {section.options?.map((opt, i) => {
          const isCorrect = opt === section.answer;
          return (
            <div key={i} style={{ 
              padding: '10px 16px', 
              borderRadius: '6px', 
              border: isCorrect ? '2px solid #10b981' : '1px solid #d1d5db',
              background: isCorrect ? '#d1fae5' : '#fff',
              color: isCorrect ? '#065f46' : '#374151',
              fontWeight: isCorrect ? 'bold' : 'normal'
            }}>
              {String.fromCharCode(65 + i)}. {opt} {isCorrect && ' ✓'}
            </div>
          );
        })}
      </div>
      {section.explanation && (
        <div style={{ background: '#fff', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #10b981', fontSize: '0.9rem', color: '#4b5563' }}>
          <strong>Giải thích:</strong> {section.explanation}
        </div>
      )}
    </div>
  );
}
