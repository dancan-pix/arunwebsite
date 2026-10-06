interface ProductIllustrationProps {
  productName: string;
  className?: string;
}

function CoverLetterIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="260" fill="#0f2240"/>
      {/* Document shadow */}
      <rect x="110" y="28" width="200" height="210" rx="6" fill="#0a1a30" opacity="0.6"/>
      {/* Main document */}
      <rect x="100" y="22" width="200" height="210" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
      {/* Header bar */}
      <rect x="100" y="22" width="200" height="38" rx="6" fill="#1e3a5f"/>
      <rect x="100" y="44" width="200" height="16" fill="#1e3a5f"/>
      {/* Header text */}
      <text x="200" y="37" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="bold" fontFamily="serif" letterSpacing="0.5">U.S. CITIZENSHIP AND IMMIGRATION</text>
      <text x="200" y="52" textAnchor="middle" fill="#93b4d4" fontSize="7" fontFamily="sans-serif">FORM I-140 — NATIONAL INTEREST WAIVER</text>
      {/* Reference box */}
      <rect x="115" y="68" width="170" height="24" rx="3" fill="#eef2f8" stroke="#c8d6e8" strokeWidth="1"/>
      <text x="200" y="80" textAnchor="middle" fill="#1e3a5f" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PETITION COVER LETTER</text>
      <text x="200" y="87" textAnchor="middle" fill="#6b87a8" fontSize="6" fontFamily="sans-serif">EB-2 NIW — INA §203(b)(2)(B)</text>
      {/* Divider */}
      <rect x="115" y="98" width="170" height="1" rx="0.5" fill="#dde5ef"/>
      {/* Content lines */}
      <rect x="115" y="104" width="170" height="5.5" rx="2" fill="#e8edf5"/>
      <rect x="115" y="114" width="155" height="5.5" rx="2" fill="#e8edf5"/>
      <rect x="115" y="124" width="162" height="5.5" rx="2" fill="#e8edf5"/>
      <rect x="115" y="134" width="148" height="5.5" rx="2" fill="#e8edf5"/>
      {/* Section label */}
      <rect x="115" y="148" width="60" height="10" rx="2" fill="#1e3a5f" opacity="0.12"/>
      <text x="145" y="156" textAnchor="middle" fill="#1e3a5f" fontSize="6" fontWeight="bold" fontFamily="sans-serif">DHANASAR PRONG 1</text>
      <rect x="115" y="163" width="170" height="5" rx="2" fill="#e8edf5"/>
      <rect x="115" y="172" width="140" height="5" rx="2" fill="#e8edf5"/>
      {/* Section label 2 */}
      <rect x="115" y="183" width="60" height="10" rx="2" fill="#1e3a5f" opacity="0.12"/>
      <text x="145" y="191" textAnchor="middle" fill="#1e3a5f" fontSize="6" fontWeight="bold" fontFamily="sans-serif">DHANASAR PRONG 2</text>
      <rect x="115" y="196" width="170" height="5" rx="2" fill="#e8edf5"/>
      <rect x="115" y="206" width="158" height="5" rx="2" fill="#e8edf5"/>
      {/* PDF badge */}
      <rect x="255" y="218" width="30" height="10" rx="3" fill="#1e3a5f" opacity="0.15"/>
      <text x="270" y="225" textAnchor="middle" fill="#1e3a5f" fontSize="6" fontWeight="bold" fontFamily="sans-serif">PDF</text>
      {/* Page number */}
      <text x="200" y="227" textAnchor="middle" fill="#b0bec8" fontSize="6" fontFamily="sans-serif">1 of 30+</text>
    </svg>
  );
}

function CVIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="260" fill="#12223a"/>
      {/* Document shadow */}
      <rect x="100" y="26" width="210" height="216" rx="6" fill="#0a1a2d" opacity="0.6"/>
      {/* Main document */}
      <rect x="90" y="20" width="210" height="216" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
      {/* Header */}
      <rect x="90" y="20" width="210" height="52" rx="6" fill="#1e3a5f"/>
      <rect x="90" y="55" width="210" height="17" fill="#1e3a5f"/>
      {/* Avatar circle */}
      <circle cx="120" cy="44" r="18" fill="#2d5a8a" stroke="#ffffff" strokeWidth="2"/>
      <circle cx="120" cy="39" r="7" fill="white" opacity="0.85"/>
      <ellipse cx="120" cy="56" rx="11" ry="7" fill="white" opacity="0.85"/>
      {/* Name and title */}
      <text x="175" y="34" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="serif">CURRICULUM VITAE</text>
      <text x="175" y="46" textAnchor="middle" fill="#93b4d4" fontSize="7" fontFamily="sans-serif">EB-2 NIW — INA §203(b)(2)(B)</text>
      <text x="175" y="64" textAnchor="middle" fill="#cfe0f0" fontSize="6.5" fontFamily="sans-serif">PhD in Mechatronics · Postdoctoral Research Fellow</text>
      {/* Education section */}
      <text x="105" y="85" fill="#1e3a5f" fontSize="7" fontWeight="bold" fontFamily="sans-serif">EDUCATION</text>
      <rect x="105" y="88" width="180" height="1" fill="#c4d4e8"/>
      <rect x="105" y="93" width="140" height="5" rx="2" fill="#e2eaf4"/>
      <rect x="105" y="101" width="120" height="4" rx="2" fill="#edf1f8"/>
      {/* Publications section */}
      <text x="105" y="115" fill="#1e3a5f" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PUBLICATIONS</text>
      <rect x="105" y="118" width="180" height="1" fill="#c4d4e8"/>
      {[0,1,2].map((i: number) => (
        <g key={i}>
          <rect x="105" y={123 + i*13} width="5" height="5" rx="1" fill="#1e3a5f" opacity="0.3"/>
          <rect x="113" y={123 + i*13} width={155 - i*10} height="5" rx="2" fill="#e2eaf4"/>
          <rect x="113" y={130 + i*13} width={130 - i*15} height="4" rx="2" fill="#edf1f8"/>
        </g>
      ))}
      {/* Experience section */}
      <text x="105" y="167" fill="#1e3a5f" fontSize="7" fontWeight="bold" fontFamily="sans-serif">EXPERIENCE</text>
      <rect x="105" y="170" width="180" height="1" fill="#c4d4e8"/>
      <rect x="105" y="175" width="150" height="5" rx="2" fill="#e2eaf4"/>
      <rect x="105" y="183" width="130" height="4" rx="2" fill="#edf1f8"/>
      <rect x="105" y="190" width="145" height="4" rx="2" fill="#edf1f8"/>
      {/* Peer reviews */}
      <text x="105" y="203" fill="#1e3a5f" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PEER REVIEWS</text>
      <rect x="105" y="206" width="180" height="1" fill="#c4d4e8"/>
      <rect x="105" y="211" width="160" height="4" rx="2" fill="#edf1f8"/>
      <rect x="105" y="218" width="145" height="4" rx="2" fill="#edf1f8"/>
      {/* Page label */}
      <text x="195" y="230" textAnchor="middle" fill="#b0bec8" fontSize="6" fontFamily="sans-serif">CURRICULUM VITAE — ARUN ASIF, Ph.D.</text>
    </svg>
  );
}

function DefaultDocumentIllustration() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="260" fill="#1a2a3a"/>
      <rect x="95" y="22" width="210" height="218" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5"/>
      <rect x="95" y="22" width="210" height="42" rx="6" fill="#1e3a5f"/>
      <rect x="95" y="48" width="210" height="16" fill="#1e3a5f"/>
      <text x="200" y="40" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="serif">NIW DOCUMENT</text>
      <text x="200" y="57" textAnchor="middle" fill="#93b4d4" fontSize="7" fontFamily="sans-serif">EB-2 NIW TEMPLATE</text>
      <rect x="112" y="76" width="176" height="5" rx="2" fill="#e2eaf4"/>
      <rect x="112" y="86" width="155" height="5" rx="2" fill="#e2eaf4"/>
      <rect x="112" y="96" width="165" height="5" rx="2" fill="#e2eaf4"/>
      <rect x="112" y="106" width="140" height="5" rx="2" fill="#e2eaf4"/>
    </svg>
  );
}

export function ProductIllustration({ productName }: ProductIllustrationProps) {
  const name = productName.toLowerCase();
  if (name.includes("cover letter") || name.includes("i-140") || name.includes("i140")) {
    return <CoverLetterIllustration />;
  }
  if (name.includes("cv") || name.includes("curriculum vitae") || name.includes("resume")) {
    return <CVIllustration />;
  }
  return <DefaultDocumentIllustration />;
}
