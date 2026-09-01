"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type WorkType =
  | ""
  | "Decorative"
  | "Minor Alteration"
  | "Major Alteration"
  | "Gut Renovation";
type ApplicationType = Exclude<WorkType, "">;
type Requirements = Record<
  ApplicationType,
  { intro: string; summary: string; highlights: string[]; documents: string[] }
>;
type Building = {
  agreementTitle: string;
  eSignTypes: ApplicationType[];
  requirements: Requirements;
  resources?: { label: string; href: string; note: string }[];
  afterApproval?: { intro: string; items: string[]; href: string };
};

const types: ApplicationType[] = [
  "Decorative",
  "Minor Alteration",
  "Major Alteration",
  "Gut Renovation",
];
const makeRequirements = (building: string): Requirements => ({
  Decorative: {
    intro: `Based on the ${building} alteration requirements.`,
    summary:
      "Start with a clear room-by-room scope and contractor information.",
    highlights: [
      "Room-by-room scope",
      "Contractor information",
      "Plans when applicable",
    ],
    documents: [
      "Narrative and room-by-room description of proposed work",
      "Contractor contact information",
      "Plans or specifications, when applicable",
    ],
  },
  "Minor Alteration": {
    intro: `Based on the ${building} alteration requirements.`,
    summary:
      "Prepare your detailed scope, plans, contractor information, and required insurance documentation.",
    highlights: [
      "Detailed scope and plans",
      "Contractor credentials",
      "Insurance and agreements",
    ],
    documents: [
      "Narrative and room-by-room description of proposed work",
      "Detailed plans and specifications",
      "Licensed contractor and subcontractor information",
      "Complete contractor and supplier agreements",
      "Required insurance certificates",
    ],
  },
  "Major Alteration": {
    intro: `Based on the ${building} alteration requirements.`,
    summary:
      "Prepare a complete professional review package before signing the Alteration Agreement electronically.",
    highlights: [
      "Architectural plans and specifications",
      "Licensed professional team",
      "Contracts, schedule, and permits",
      "Electronic Alteration Agreement",
    ],
    documents: [
      "Narrative and room-by-room description of proposed work",
      "Detailed architect or engineer plans and specifications",
      "Licensed contractor and subcontractor information",
      "Complete contractor and supplier agreements",
      "Proposed work schedule by trade",
      "Required governmental approvals and permits",
    ],
  },
  "Gut Renovation": {
    intro: `Based on the ${building} alteration requirements.`,
    summary:
      "Prepare the full professional review package, including any required agency, asbestos, or building-system documentation.",
    highlights: [
      "Architectural plans and specifications",
      "Licensed professional team",
      "Contracts, schedule, and permits",
      "Electronic Alteration Agreement",
    ],
    documents: [
      "Narrative and room-by-room description of proposed work",
      "Detailed architect or engineer plans and specifications",
      "Licensed contractor and subcontractor information",
      "Complete contractor and supplier agreements",
      "Proposed work schedule by trade",
      "Required governmental, asbestos, or building-system documentation",
    ],
  },
});

const buildings: Record<string, Building> = {
  "515 Park Avenue Condominium": {
    agreementTitle: "515 Park Avenue Alteration Agreement",
    eSignTypes: ["Major Alteration", "Gut Renovation"],
    requirements: makeRequirements("515 Park Avenue Condominium"),
  },
  "425 East 86 Apartments Corp.": {
    agreementTitle: "425 East 86 Apartments Corp. Alteration Agreement",
    eSignTypes: types,
    requirements: makeRequirements("425 East 86 Apartments Corp."),
  },
  "870 Fifth Avenue": {
    agreementTitle:
      "870 Fifth Avenue Corporation Alteration Agreement & Protocol",
    eSignTypes: types,
    requirements: makeRequirements("870 Fifth Avenue"),
    resources: [
      {
        label: "Alteration Agreement & Protocol",
        href: "/agreements/870-fifth-alteration-agreement.pdf",
        note: "870 Fifth Avenue Corporation",
      },
      {
        label: "COI Requirements & Insurance Indemnity",
        href: "/agreements/870-fifth-coi-requirements.pdf",
        note: "Required after work approval",
      },
    ],
    afterApproval: {
      intro:
        "Once work has been approved, submit the COI package and remaining commencement materials to management. No work may begin until these materials are accepted.",
      items: [
        "Certificates of insurance for all vendors, contractors, and subcontractors, including workers' compensation",
        "Executed Hold Harmless Agreement signed by contractor and shareholder",
        "Required permits and licenses",
        "Start and end dates, required fees or deposit, and shareholder W-9",
        "At least 10 days' written notice of commencement and required neighbor notice",
      ],
      href: "/agreements/870-fifth-coi-requirements.pdf",
    },
  },
};

export default function Home() {
  const [building, setBuilding] = useState("");
  const [residentName, setResidentName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [workType, setWorkType] = useState<WorkType>("");
  const [files, setFiles] = useState<File[]>([]);
  const [signatureName, setSignatureName] = useState("");
  const [signatureAccepted, setSignatureAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const config = buildings[building];
  const selected = workType ? (config?.requirements[workType] ?? null) : null;
  const needsSignature = Boolean(
    workType && config?.eSignTypes.includes(workType),
  );
  const signatureComplete =
    !needsSignature || (signatureName.trim().length >= 3 && signatureAccepted);
  const canSubmit = Boolean(
    building &&
      residentName.trim().length >= 2 &&
      unitNumber.trim().length >= 1 &&
      workType &&
      selected &&
      files.length > 0 &&
      (workType === "Decorative" ||
        workType === "Minor Alteration" ||
        files.length >= selected.documents.length) &&
      signatureComplete,
  );
  const progress = useMemo(
    () => (!building ? 1 : !workType ? 2 : needsSignature ? 4 : 3),
    [building, workType, needsSignature],
  );
  const reset = () => {
    setWorkType("");
    setFiles([]);
    setSignatureName("");
    setSignatureAccepted(false);
    setSubmitted(false);
  };
  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []));
    setSubmitted(false);
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) setSubmitted(true);
  }
  return (
    <main>
      <header className="topbar">
        <div className="brand-mark">DE</div>
        <div>
          <p className="eyebrow">Douglas Elliman Property Management</p>
          <h1>Alteration Applications</h1>
        </div>
        <span className="secure">Secure applicant portal</span>
      </header>
      <section className="hero">
        <div>
          <p className="eyebrow light">Start an application</p>
          <h2>Make your alteration process clear from the very beginning.</h2>
          <p>
            Select your property first. We will then show the right application
            path and document requirements for your proposed work.
          </p>
        </div>
        <div className="hero-note">
          <span>Questions before you begin?</span>
          <strong>Contact your property management team.</strong>
        </div>
      </section>
      <section className="content">
        <div className="steps">
          {[
            [1, "Property"],
            [2, "Alteration type"],
            [3, "Documents"],
            [4, "E-sign agreement"],
          ].map(([number, label]) => (
            <div
              className={progress >= Number(number) ? "step active" : "step"}
              key={String(number)}
            >
              <span>{number}</span>
              {label}
            </div>
          ))}
        </div>
        <form onSubmit={submit}>
          <section className="form-section">
            <div className="section-heading">
              <span>01</span>
              <div>
                <h3>Your apartment and property</h3>
                <p>
                  This is required so the application follows the
                  building&apos;s rules.
                </p>
              </div>
            </div>
            <label htmlFor="building">
              Property <b>Required</b>
            </label>
            <select
              id="building"
              value={building}
              onChange={(event) => {
                setBuilding(event.target.value);
                reset();
              }}
              required
            >
              <option value="">Select a property</option>
              {Object.keys(buildings).map((property) => (
                <option key={property}>{property}</option>
              ))}
            </select>
            <div className="resident-fields">
              <div>
                <label htmlFor="resident-name">
                  Resident or shareholder full name <b>Required</b>
                </label>
                <input
                  id="resident-name"
                  value={residentName}
                  onChange={(event) => {
                    setResidentName(event.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="unit-number">
                  Apartment or unit number <b>Required</b>
                </label>
                <input
                  id="unit-number"
                  value={unitNumber}
                  onChange={(event) => {
                    setUnitNumber(event.target.value);
                    setSubmitted(false);
                  }}
                  placeholder="e.g., 12A"
                  required
                />
              </div>
            </div>
            <p className="sample-note">
              Configured properties:{" "}
              <strong>425 East 86 Apartments Corp.</strong>,{" "}
              <strong>515 Park Avenue Condominium</strong>, and{" "}
              <strong>870 Fifth Avenue</strong>
            </p>
          </section>
          {building && (
            <section className="form-section fade-in">
              <div className="section-heading">
                <span>02</span>
                <div>
                  <h3>Select the work type</h3>
                  <p>
                    Choose the option that best matches the scope of your
                    project.
                  </p>
                </div>
              </div>
              <div className="type-grid">
                {types.map((type) => (
                  <button
                    type="button"
                    className={
                      workType === type ? "type-card selected" : "type-card"
                    }
                    onClick={() => {
                      setWorkType(type);
                      setFiles([]);
                      setSignatureName("");
                      setSignatureAccepted(false);
                      setSubmitted(false);
                    }}
                    key={type}
                  >
                    <span>
                      {type === "Decorative"
                        ? "✦"
                        : type === "Minor Alteration"
                          ? "⌁"
                          : type === "Major Alteration"
                            ? "▦"
                            : "▤"}
                    </span>
                    <strong>{type}</strong>
                    <small>
                      {type === "Decorative"
                        ? "Cosmetic finishes"
                        : type === "Minor Alteration"
                          ? "Limited interior work"
                          : type === "Major Alteration"
                            ? "Substantial interior work"
                            : "Full interior renovation"}
                    </small>
                  </button>
                ))}
              </div>
            </section>
          )}
          {selected && (
            <section className="requirements-summary fade-in">
              <div className="summary-copy">
                <p className="eyebrow">Before you begin</p>
                <h3>{workType} requirements</h3>
                <p>{selected.summary}</p>
              </div>
              <ul>
                {selected.highlights.map((item) => (
                  <li key={item}>
                    <span>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {selected && config?.afterApproval && (
            <section className="post-approval fade-in">
              <p className="eyebrow">After work approval</p>
              <h3>
                Before work begins: submit insurance and commencement materials
              </h3>
              <p>{config.afterApproval.intro}</p>
              <ul>
                {config.afterApproval.items.map((item) => (
                  <li key={item}>
                    <span>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href={config.afterApproval.href} download>
                Download 870 Fifth COI requirements <span>↓</span>
              </a>
            </section>
          )}
          {selected && (
            <section className="form-section fade-in">
              <div className="section-heading">
                <span>03</span>
                <div>
                  <h3>Complete your application</h3>
                  <p>{selected.intro}</p>
                </div>
              </div>
              {needsSignature && (
                <div className="agreement">
                  <div>
                    <p className="eyebrow">Agreement required</p>
                    <h4>{config?.agreementTitle}</h4>
                    <p>
                      You will review and sign this agreement electronically
                      after uploading the supporting documents.
                    </p>
                  </div>
                  <span>E-SIGN</span>
                </div>
              )}
              {config?.resources && (
                <div className="reference-documents">
                  <div>
                    <p className="eyebrow">Building documents</p>
                    <h4>Review the source documents</h4>
                  </div>
                  <div className="resource-links">
                    {config.resources.map((resource) => (
                      <a href={resource.href} download key={resource.href}>
                        <span>
                          <strong>{resource.label}</strong>
                          <small>{resource.note}</small>
                        </span>
                        <b>Download ↓</b>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div className="checklist">
                <div className="checklist-head">
                  <h4>Required documents</h4>
                  <span>
                    {files.length} file{files.length === 1 ? "" : "s"} selected
                  </span>
                </div>
                <ul>
                  {selected.documents.map((document) => (
                    <li key={document}>
                      <span>✓</span>
                      {document}
                    </li>
                  ))}
                </ul>
              </div>
              <label className="upload" htmlFor="documents">
                <input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={selectFiles}
                />
                <span className="upload-icon">↑</span>
                <strong>Upload your documents</strong>
                <small>PDF, Word, JPG or PNG · Select multiple files</small>
              </label>
              {files.length > 0 && (
                <ul className="files">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}`}>
                      <span>✓</span>
                      {file.name}
                      <small>{Math.ceil(file.size / 1024)} KB</small>
                    </li>
                  ))}
                </ul>
              )}
              {needsSignature && (
                <section className="signature-panel">
                  <div className="signature-heading">
                    <div className="signature-seal">✓</div>
                    <div>
                      <p className="eyebrow">Electronic signature</p>
                      <h4>Review and sign your agreement</h4>
                      <p>
                        Your signed agreement will be included with the
                        application package.
                      </p>
                    </div>
                  </div>
                  <div className="agreement-preview">
                    <div className="preview-top">
                      <strong>{building}</strong>
                      <span>Alteration Agreement</span>
                    </div>
                    <p>
                      I have reviewed the Alteration Agreement and agree to its
                      terms on behalf of the unit owner.
                    </p>
                    <small>Document prepared for electronic signature</small>
                  </div>
                  <label htmlFor="signature-name">
                    Signer&apos;s full legal name <b>Required</b>
                  </label>
                  <input
                    id="signature-name"
                    className="signature-input"
                    value={signatureName}
                    onChange={(event) => {
                      setSignatureName(event.target.value);
                      setSubmitted(false);
                    }}
                    placeholder="Type your full legal name"
                    autoComplete="name"
                  />
                  <div className="signature-render">
                    <span>Adopted signature</span>
                    <strong
                      className={
                        signatureName
                          ? "signature-value"
                          : "signature-placeholder"
                      }
                    >
                      {signatureName || "Your signature will appear here"}
                    </strong>
                    <small>
                      {signatureName
                        ? "Signed electronically"
                        : "Type your name above to sign"}
                    </small>
                  </div>
                  <div className="agreement-check signature-consent">
                    <input
                      id="signature-consent"
                      type="checkbox"
                      checked={signatureAccepted}
                      onChange={(event) => {
                        setSignatureAccepted(event.target.checked);
                        setSubmitted(false);
                      }}
                    />
                    <label htmlFor="signature-consent">
                      I agree to use an electronic signature and intend my typed
                      name to serve as my signature on this agreement.
                    </label>
                  </div>
                </section>
              )}
              <div className="agreement-check">
                <input id="acknowledge" type="checkbox" required />
                <label htmlFor="acknowledge">
                  I confirm that the information and documents submitted are
                  complete and accurate.
                </label>
              </div>
              <button type="submit" className="submit" disabled={!canSubmit}>
                {needsSignature
                  ? "Submit signed application"
                  : "Submit application"}{" "}
                <span>→</span>
              </button>
              {!canSubmit && (
                <p className="form-hint">
                  Enter your name and unit number, select a property and work
                  type, and upload the required documents
                  {needsSignature
                    ? ", then sign the agreement electronically"
                    : ""}{" "}
                  to continue.
                </p>
              )}
              {submitted && (
                <div className="confirmation">
                  <strong>
                    {needsSignature
                      ? "Signed application ready for review."
                      : "Application ready for review."}
                  </strong>
                  <br />
                  Your electronic signature and supporting documents have been
                  captured in this sample workflow.
                </div>
              )}
            </section>
          )}
        </form>
      </section>
      <footer>
        <span>Alteration Applications</span>
        <span>
          © {new Date().getFullYear()} Douglas Elliman Property Management
        </span>
      </footer>
    </main>
  );
}
