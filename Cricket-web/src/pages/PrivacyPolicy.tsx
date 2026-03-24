import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/layout/AppLayout";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
    return (
        <AppLayout>
            <div className="container mx-auto p-4 max-w-4xl pt-20">
                <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-primary font-serif">Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <ScrollArea className="h-[70vh] pr-4">
                            <div className="space-y-6">
                                <section>
                                    <h3 className="text-xl font-semibold text-foreground">1. Introduction</h3>
                                    <p>
                                        Welcome to the South Zone Women’s Cricket Tournament App, managed by K.S. Rangasamy College of Technology (KSRCT).
                                        This privacy policy explains how we handle your data. We are committed to protecting your privacy and ensuring a safe user experience.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-foreground">2. Data Collection</h3>
                                    <p>
                                        This app is designed to be privacy-first. We do not collect personal data such as names, emails, or phone numbers from general users.
                                        The app primarily functions as an information portal for the tournament.
                                    </p>
                                    <ul className="list-disc pl-5 mt-2">
                                        <li><strong>Device Permissions:</strong> We request minimal permissions necessary for the app's functionality (e.g., Internet access for updates).</li>
                                        <li><strong>Local Storage:</strong> Some preferences or cached data may be stored locally on your device to improve performance and offline access.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-foreground">3. User Roles & Access</h3>
                                    <p>
                                        The app features specific roles for Players, Managers, and Officials. Any data related to these roles (such as team lists or schedules) is managed
                                        internally by the Organizing Committee and is not shared with third parties for commercial purposes.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-foreground">4. Photos & Media</h3>
                                    <p>
                                        The app displays photos and videos from the tournament (Gallery). By participating in the tournament, teams and players acknowledge that
                                        official photographs taken during the event may be published in this app.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-foreground">5. Third-Party Services</h3>
                                    <p>
                                        We may use third-party services like Google Maps for venue navigation. These services have their own privacy policies.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-foreground">6. Offline Access</h3>
                                    <p>
                                        Key information such as Schedules and Rules are designed to be accessible offline once loaded, ensuring you have access even without an active internet connection.
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xl font-semibold text-foreground">7. Contact Us</h3>
                                    <p>
                                        If you have any questions about this policy or the app, please contact the Organizing Committee:
                                    </p>
                                    <p className="mt-2">
                                        <strong>K.S. Rangasamy College of Technology</strong><br />
                                        Tiruchengode - 637 215, Tamil Nadu, India.<br />
                                        Email: contact@ksrct.ac.in
                                    </p>
                                </section>

                                <div className="pt-4 text-xs text-center border-t">
                                    <p>Last Updated: January 2026</p>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
