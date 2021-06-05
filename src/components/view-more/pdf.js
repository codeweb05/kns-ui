import { useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import samplePdf from "../../assets/KNS-KALISTO-DOUBLE SIDE FLOW (1).pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Pdf() {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	return (
		<div>
			<Document
				file={samplePdf}
				onLoadSuccess={onDocumentLoadSuccess}
				options={{
					cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
					cMapPacked: true,
				}}
			>
				<Page pageNumber={pageNumber} />
			</Document>

			<p className="text-center">
				Page {pageNumber} of {numPages}
			</p>
			<div className="d-flex justify-content-between" >
				<button
					className="btn btn-red-leaf py-1 text-white"
					disabled={pageNumber === 1}
					onClick={() => {
						if (pageNumber > 1) {
							setPageNumber((prev) => prev - 1);
						}
					}}
				>
					Previous
				</button>
				<button
					className="btn btn-red-leaf py-1 text-white"
					disabled={pageNumber === numPages}
					onClick={() => {
						if (pageNumber < numPages) {
							setPageNumber((prev) => prev + 1);
						}
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
}
