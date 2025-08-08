import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, User, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";

export default function Auth() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState<'customer' | 'worker'>('customer');

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'worker') {
      setUserType('worker');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20 bg-gradient-to-br from-background to-secondary/20">
        <div className="container max-w-md">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <Card className="glass-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isLogin ? t.auth.login : t.auth.register}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? "Sign in to your account" 
                  : "Create your account to get started"
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={isLogin ? "login" : "register"} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="login" 
                    onClick={() => setIsLogin(true)}
                  >
                    {t.auth.signIn}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    onClick={() => setIsLogin(false)}
                  >
                    {t.auth.signUp}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-6">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.auth.email}</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com"
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">{t.auth.password}</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                      />
                    </div>
                    
                    <div className="text-right">
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-primary hover:underline"
                      >
                        {t.auth.forgotPassword}
                      </Link>
                    </div>
                    
                    <Button type="submit" className="w-full btn-primary">
                      {t.auth.signIn}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="mt-6">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t.auth.fullName}</Label>
                      <Input 
                        id="fullName" 
                        type="text" 
                        placeholder="Your full name"
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.auth.email}</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com"
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.auth.phone}</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">{t.auth.password}</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        required 
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>{t.auth.userType}</Label>
                      <RadioGroup 
                        value={userType} 
                        onValueChange={(value) => setUserType(value as 'customer' | 'worker')}
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="customer" id="customer" />
                          <Label htmlFor="customer" className="flex items-center cursor-pointer">
                            <User className="h-4 w-4 mr-2" />
                            {t.auth.customer}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="worker" id="worker" />
                          <Label htmlFor="worker" className="flex items-center cursor-pointer">
                            <Briefcase className="h-4 w-4 mr-2" />
                            {t.auth.worker}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button type="submit" className="w-full btn-primary">
                      {t.auth.signUp}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}