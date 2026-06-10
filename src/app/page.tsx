import { Suspense } from "react";

import { ServicePickerScreen } from "@/features/service-picker";

export default function Home() {
	return (
		<Suspense fallback={null}>
			<ServicePickerScreen />
		</Suspense>
	);
}
