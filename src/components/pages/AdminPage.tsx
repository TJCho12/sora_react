import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { Edit, Trash2, Plus, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

interface AdminPageProps {
  onLogout: () => void;
  isDemoMode?: boolean;
  isPreviewMode?: boolean;
}

export default function AdminPage({ onLogout, isDemoMode = false, isPreviewMode = false }: AdminPageProps) {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isCreateTreatmentOpen, setIsCreateTreatmentOpen] = useState(false);

  const adminToken = localStorage.getItem('adminToken');

  const apiCall = async (endpoint: string, options: any = {}) => {
    console.log('Making API call:', endpoint, options.method || 'GET');
    
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3336005e${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
        ...options.headers,
      },
    });
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'API call failed';
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      console.error('API error:', response.status, errorMessage);
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    console.log('API response:', result);
    return result;
  };

  const loadData = async () => {
    try {
      setLoading(true);
      
      if (isDemoMode || isPreviewMode) {
        // Demo data for preview mode
        setBookings([
          {
            id: '1',
            name: '김지은',
            email: 'kim.jieun@example.com',
            phone: '010-1234-5678',
            service: 'Facial Treatment',
            date: '2024-08-30',
            time: '14:00',
            status: 'confirmed',
            message: '처음 받는 시술이라 걱정됩니다. 상담 시간을 조금 더 가져주시면 감사하겠습니다.'
          },
          {
            id: '2',
            name: '박민주',
            email: 'park.minju@example.com',
            phone: '010-2345-6789',
            service: 'Laser Therapy',
            date: '2024-08-31',
            time: '10:30',
            status: 'pending',
            message: '레이저 시술 전 주의사항이 있는지 문의드립니다.'
          },
          {
            id: '3',
            name: '이소영',
            email: 'lee.soyoung@example.com',
            phone: '010-3456-7890',
            service: 'Skin Analysis',
            date: '2024-09-01',
            time: '16:00',
            status: 'cancelled',
            message: '일정이 변경되어 취소합니다. 다시 예약하겠습니다.'
          }
        ]);
        
        setEvents([
          {
            id: 1,
            title: 'Summer Beauty Package',
            category: 'Facial Treatment',
            discount: '40% OFF',
            originalPrice: '$800',
            promotionPrice: '$480',
            validUntil: 'Valid until August 31, 2024',
            image: 'https://images.unsplash.com/photo-1616391182219-e080b4d44c4b?w=400',
            description: '여름철 특별 스킨케어 패키지로 건강하고 빛나는 피부를 만들어보세요.',
            includes: ['6 Sessions Full Body', 'Free Consultation', 'Aftercare Products']
          },
          {
            id: 2,
            title: 'Anti-Aging Special',
            category: 'Anti-Aging',
            discount: '30% OFF',
            originalPrice: '$1200',
            promotionPrice: '$840',
            validUntil: 'Valid until September 15, 2024',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
            description: '최신 안티에이징 기술로 젊고 탄력있는 피부로 되돌려드립니다.',
            includes: ['Advanced Laser Treatment', 'Personalized Care Plan', 'Premium Products']
          }
        ]);
        
        setTreatments([
          {
            id: 1,
            title: '여름철 피부관리의 핵심 포인트',
            excerpt: '뜨거운 여름철, 피부를 건강하게 유지하는 방법과 주의사항을 알아보세요. 자외선 차단부터 수분 관리까지...',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
            author: 'Dr. 김소라',
            date: '2024.08.20',
            category: 'Skincare Tips'
          },
          {
            id: 2,
            title: '올바른 클렌징의 중요성',
            excerpt: '건강한 피부의 첫걸음은 올바른 클렌징에서 시작됩니다. 피부 타입별 클렌징 방법을 소개합니다...',
            image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400',
            author: 'Dr. 이민정',
            date: '2024.08.15',
            category: 'Daily Care'
          },
          {
            id: 3,
            title: '레이저 시술 후 관리법',
            excerpt: '레이저 시술 후 빠른 회복과 최적의 결과를 위한 관리 방법을 전문의가 직접 알려드립니다...',
            image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400',
            author: 'Dr. 박지현',
            date: '2024.08.10',
            category: 'Treatment Guide'
          }
        ]);
        
        if (isDemoMode) {
          toast.success('데모 데이터가 로드되었습니다');
        }
      } else {
        // Real API calls
        const [bookingsRes, eventsRes, treatmentsRes] = await Promise.all([
          // Bookings endpoint is now public - no auth needed
          fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3336005e/bookings`),
          apiCall('/admin/events'),
          apiCall('/admin/treatments')
        ]);

        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData.bookings || []);
        setEvents(eventsRes.events || []);
        setTreatments(treatmentsRes.treatments || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (!isDemoMode && !isPreviewMode) {
        toast.error('데이터 로딩 실패');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateBookingStatus = async (bookingId: string, status: string) => {
    if (isDemoMode || isPreviewMode) {
      toast.info('데모 모드에서는 실제 데이터가 변경되지 않습니다');
      return;
    }
    
    try {
      // Booking update endpoint is now public - no auth needed
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3336005e/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });
      
      toast.success('예약 상태가 업데이트되었습니다');
      loadData();
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('예약 상태 업데이트 실패');
    }
  };

  const handleEventSubmit = async (eventData: any) => {
    if (isDemoMode || isPreviewMode) {
      toast.info('데모 모드에서는 실제 데이터가 변경되지 않습니다');
      setEditingEvent(null);
      setIsCreateEventOpen(false);
      return;
    }
    
    try {
      if (editingEvent) {
        await apiCall(`/admin/events/${editingEvent.id}`, {
          method: 'PUT',
          body: JSON.stringify(eventData)
        });
        toast.success('이벤트가 업데이트되었습니다');
      } else {
        await apiCall('/admin/events', {
          method: 'POST',
          body: JSON.stringify(eventData)
        });
        toast.success('이벤트가 생성되었습니다');
      }
      
      setEditingEvent(null);
      setIsCreateEventOpen(false);
      loadData();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('이벤트 저장 실패');
    }
  };

  const handleTreatmentSubmit = async (treatmentData: any) => {
    if (isDemoMode || isPreviewMode) {
      toast.info('데모 모드에서는 실제 데이터가 변경되지 않습니다');
      setEditingTreatment(null);
      setIsCreateTreatmentOpen(false);
      return;
    }
    
    try {
      if (editingTreatment) {
        await apiCall(`/admin/treatments/${editingTreatment.id}`, {
          method: 'PUT',
          body: JSON.stringify(treatmentData)
        });
        toast.success('트리트먼트가 업데이트되었습니다');
      } else {
        await apiCall('/admin/treatments', {
          method: 'POST',
          body: JSON.stringify(treatmentData)
        });
        toast.success('트리트먼트가 생성되었습니다');
      }
      
      setEditingTreatment(null);
      setIsCreateTreatmentOpen(false);
      loadData();
    } catch (error) {
      console.error('Error saving treatment:', error);
      toast.error('트리트먼트 저장 실패');
    }
  };

  const deleteEvent = async (eventId: number) => {
    if (isDemoMode || isPreviewMode) {
      toast.info('데모 모드에서는 실제 데이터가 삭제되지 않습니다');
      return;
    }
    
    try {
      await apiCall(`/admin/events/${eventId}`, { method: 'DELETE' });
      toast.success('이벤트가 삭제되었습니다');
      loadData();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('이벤트 삭제 실패');
    }
  };

  const deleteTreatment = async (treatmentId: number) => {
    if (isDemoMode || isPreviewMode) {
      toast.info('데모 모드에서는 실제 데이터가 삭제되지 않습니다');
      return;
    }
    
    try {
      await apiCall(`/admin/treatments/${treatmentId}`, { method: 'DELETE' });
      toast.success('트리트먼트가 삭제되었습니다');
      loadData();
    } catch (error) {
      console.error('Error deleting treatment:', error);
      toast.error('트리트먼트 삭제 실패');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'secondary', icon: Clock, text: '대기중' },
      confirmed: { variant: 'default', icon: CheckCircle, text: '확정' },
      cancelled: { variant: 'destructive', icon: XCircle, text: '취소' },
    };
    
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#0ABAB5]/30 border-t-[#0ABAB5] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl text-gray-800">SoRa Clinic</h1>
              {(isDemoMode || isPreviewMode) && (
                <Badge variant="secondary" className="bg-[#0ABAB5]/10 text-[#0ABAB5] border border-[#0ABAB5]/20">
                  {isPreviewMode ? '🎯 미리보기 모드' : '🎮 데모 모드'}
                </Badge>
              )}
            </div>
            <p className="text-xl text-gray-600">
              관리자 대시보드
              {(isDemoMode || isPreviewMode) && (
                <span className="text-sm text-gray-500 ml-2">
                  • 샘플 데이터가 표시됩니다
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {isPreviewMode && (
              <Button 
                onClick={() => window.history.back()}
                variant="outline" 
                className="border-[#0ABAB5] text-[#0ABAB5] hover:bg-[#0ABAB5] hover:text-white"
              >
                ← 홈으로
              </Button>
            )}
            <Button 
              onClick={onLogout}
              variant="outline" 
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              {isPreviewMode ? '닫기' : '로그아웃'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-pink-100">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-white">
              예약 관리 ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-white">
              이벤트 관리 ({events.length})
            </TabsTrigger>
            <TabsTrigger value="treatments" className="data-[state=active]:bg-[#0ABAB5] data-[state=active]:text-white">
              트리트먼트 관리 ({treatments.length})
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border border-pink-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-gray-800">{booking.name}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-gray-600">{booking.email} • {booking.phone}</p>
                        <p className="text-sm text-gray-500">
                          {booking.service} • {booking.date} {booking.time}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>예약 상세 정보</DialogTitle>
                              <DialogDescription>
                                예약 정보를 확인하고 상태를 업데이트할 수 있습니다.
                              </DialogDescription>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>이름</Label>
                                    <p className="text-sm text-gray-700">{selectedBooking.name}</p>
                                  </div>
                                  <div>
                                    <Label>이메일</Label>
                                    <p className="text-sm text-gray-700">{selectedBooking.email}</p>
                                  </div>
                                  <div>
                                    <Label>연락처</Label>
                                    <p className="text-sm text-gray-700">{selectedBooking.phone}</p>
                                  </div>
                                  <div>
                                    <Label>서비스</Label>
                                    <p className="text-sm text-gray-700">{selectedBooking.service}</p>
                                  </div>
                                  <div>
                                    <Label>날짜</Label>
                                    <p className="text-sm text-gray-700">{selectedBooking.date}</p>
                                  </div>
                                  <div>
                                    <Label>시간</Label>
                                    <p className="text-sm text-gray-700">{selectedBooking.time}</p>
                                  </div>
                                </div>
                                {selectedBooking.message && (
                                  <div>
                                    <Label>메시지</Label>
                                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedBooking.message}</p>
                                  </div>
                                )}
                                <div className="flex gap-2 pt-4">
                                  <Select defaultValue={selectedBooking.status} onValueChange={(status) => updateBookingStatus(selectedBooking.id, status)}>
                                    <SelectTrigger className="w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">대기중</SelectItem>
                                      <SelectItem value="confirmed">확정</SelectItem>
                                      <SelectItem value="cancelled">취소</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    {booking.message && (
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{booking.message}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#0ABAB5] to-pink-400 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    이벤트 추가
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>새 이벤트 추가</DialogTitle>
                    <DialogDescription>
                      새로운 이벤트를 생성하여 고객들에게 특별한 혜택을 제공하세요.
                    </DialogDescription>
                  </DialogHeader>
                  <EventForm onSubmit={handleEventSubmit} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id} className="bg-white/80 backdrop-blur-sm border border-pink-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                        <p className="text-gray-600">{event.category}</p>
                        <p className="text-sm text-gray-500">{event.discount} - {event.validUntil}</p>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingEvent(event)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>이벤트 수정</DialogTitle>
                              <DialogDescription>
                                기존 이벤트 정보를 수정하여 업데이트하세요.
                              </DialogDescription>
                            </DialogHeader>
                            <EventForm event={editingEvent} onSubmit={handleEventSubmit} />
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>이벤트 삭제</AlertDialogTitle>
                              <AlertDialogDescription>
                                정말 이 이벤트를 삭제하시겠습니까?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteEvent(event.id)}>
                                삭제
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Treatments Tab */}
          <TabsContent value="treatments" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Dialog open={isCreateTreatmentOpen} onOpenChange={setIsCreateTreatmentOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-[#0ABAB5] to-pink-400 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    트리트먼트 추가
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>새 트리트먼트 추가</DialogTitle>
                    <DialogDescription>
                      새로운 트리트먼트 정보를 추가하여 서비스를 확장하세요.
                    </DialogDescription>
                  </DialogHeader>
                  <TreatmentForm onSubmit={handleTreatmentSubmit} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {treatments.map((treatment) => (
                <Card key={treatment.id} className="bg-white/80 backdrop-blur-sm border border-pink-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">{treatment.title}</h3>
                        <p className="text-gray-600">{treatment.category}</p>
                        <p className="text-sm text-gray-500">{treatment.author} • {treatment.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingTreatment(treatment)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>트리트먼트 수정</DialogTitle>
                              <DialogDescription>
                                기존 트리트먼트 정보를 수정하여 업데이트하세요.
                              </DialogDescription>
                            </DialogHeader>
                            <TreatmentForm treatment={editingTreatment} onSubmit={handleTreatmentSubmit} />
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>트리트먼트 삭제</AlertDialogTitle>
                              <AlertDialogDescription>
                                정말 이 트리트먼트를 삭제하시겠습니까?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>취소</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteTreatment(treatment.id)}>
                                삭제
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function EventForm({ event, onSubmit }: { event?: any; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    category: event?.category || '',
    discount: event?.discount || '',
    originalPrice: event?.originalPrice || '',
    promotionPrice: event?.promotionPrice || '',
    validUntil: event?.validUntil || '',
    image: event?.image || '',
    description: event?.description || '',
    includes: event?.includes?.join('\n') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      includes: formData.includes.split('\n').filter(item => item.trim())
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">카테고리</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="discount">할인율</Label>
          <Input
            id="discount"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            placeholder="40% OFF"
            required
          />
        </div>
        <div>
          <Label htmlFor="validUntil">유효기간</Label>
          <Input
            id="validUntil"
            value={formData.validUntil}
            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
            placeholder="Valid until March 31, 2024"
            required
          />
        </div>
        <div>
          <Label htmlFor="originalPrice">원가</Label>
          <Input
            id="originalPrice"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            placeholder="$800"
            required
          />
        </div>
        <div>
          <Label htmlFor="promotionPrice">할인가</Label>
          <Input
            id="promotionPrice"
            value={formData.promotionPrice}
            onChange={(e) => setFormData({ ...formData, promotionPrice: e.target.value })}
            placeholder="$480"
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="image">이미지 URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://..."
          required
        />
      </div>
      <div>
        <Label htmlFor="description">설명</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>
      <div>
        <Label htmlFor="includes">포함 사항 (줄바꿈으로 구분)</Label>
        <Textarea
          id="includes"
          value={formData.includes}
          onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
          rows={4}
          placeholder="6 Sessions Full Body&#10;Free Consultation&#10;Aftercare Products"
          required
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-[#0ABAB5] to-pink-400 text-white">
        {event ? '수정하기' : '추가하기'}
      </Button>
    </form>
  );
}

function TreatmentForm({ treatment, onSubmit }: { treatment?: any; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: treatment?.title || '',
    excerpt: treatment?.excerpt || '',
    image: treatment?.image || '',
    author: treatment?.author || '',
    date: treatment?.date || new Date().toLocaleDateString('ko-KR'),
    category: treatment?.category || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">작성자</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">카테고리</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="image">이미지 URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://..."
          required
        />
      </div>
      <div>
        <Label htmlFor="excerpt">요약</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={4}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-[#0ABAB5] to-pink-400 text-white">
        {treatment ? '수정하기' : '추가하기'}
      </Button>
    </form>
  );
}