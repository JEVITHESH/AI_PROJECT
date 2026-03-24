import { Button } from "@/components/ui/button";

export default function QuickActions() {
    return (
        <section className="container mx-auto py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-indigo-50 border-indigo-100 shadow-sm" asChild>
                    <a href="/discover">
                        <span className="text-2xl">🗺️</span>
                        <span className="font-semibold text-indigo-900">Tourist Spots</span>
                    </a>
                </Button>
                {/* Add other quick actions as needed, currently placeholder */}
            </div>
        </section>
    )
}
