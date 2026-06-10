import { Suspense } from "react";

import { PaymentStepScreen } from "@/features/payment-step";

export default function PaymentPage() {
	return (
		<Suspense fallback={null}>
			<PaymentStepScreen />
		</Suspense>
	);
}