'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Playfair_Display } from 'next/font/google';
import { Card } from '@/components/ui/card';
import Photocard from '@/components/photocard';
import LoadingButton from '@/components/loadingButton';
import { uploadPhoto } from '@/action/uploadActions';

const playfair = Playfair_Display({
  weight: '700',
  subsets: ['latin'],
  style: 'italic',
});

const Page = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [dayOpen, setDayOpen] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [schedule, setSchedule] = useState<string[]>([]);
  const [error, setError] = useState('');

  // const createForm = useRef<HTMLFormElement>(null);

  const handleAddSchedule = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (dayOpen && openTime && closingTime) {
      setSchedule((prevSchedule) => [
        ...prevSchedule,
        `${dayOpen} :  ${openTime} - ${closingTime}`,
      ]);
    }
    setDayOpen('');
    setOpenTime('');
    setClosingTime('');
  };

  const handleRemoveSchedule = (
    e: React.MouseEvent<HTMLButtonElement>,
    i: number
  ) => {
    e.preventDefault();
    const updatedSchedule = schedule.filter((_, index) => {
      return index !== i;
    });

    setSchedule(updatedSchedule);
  };

  const handleInputFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const images = e.target.files;
    if (!images) {
      return setError('Enter atleast 1 image');
    }
    const imageArray = Array.from(images);
    const newFiles = imageArray.filter((file) => {
      if (file.size < 1204 * 1204 && file.type.startsWith('image/')) {
        return file;
      } else {
        return setError('Invalid image format');
      }
    });

    const MAX_IMAGES = 4;

    setImages((prev: File[]) => {
      const availableSlots = MAX_IMAGES - prev.length;
      const filesToAdd = newFiles.slice(0, availableSlots);

      if (availableSlots <= 0) {
        setError('Please enter only 4 images');
        return prev;
      }

      return [...prev, ...filesToAdd];
    });

    // const photos = await uploadPhoto(newFiles);
  };

  const handlePreviewDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const formData = new FormData();

  formData.append('name', name);
  formData.append('username', username);
  formData.append('email', email);
  formData.append('twitter', twitter);
  formData.append('instagram', instagram);
  formData.append('tiktok', tiktok);
  formData.append('website', website);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('state', state);
  formData.append('description', description);
  formData.append('password', password);
  formData.append('confirmPassword', confirmPassword);
  images.map((image) => {
    formData.append(`images`, image);
  });
  schedule.map((day) => {
    formData.append(`schedule`, day);
  });

  const handleAddForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await uploadPhoto(formData);
  };

  return (
    <main className="m-4 lg:w-10/12 mx-auto">
      <Card className="p-7 mx-auto glass">
        <div className="mb-4">
          <h1 className={`${playfair.className} text-3xl mb-2`}>Add Hub</h1>
          <p>Add your hub</p>
        </div>
        <form className="space-y-8" onSubmit={handleAddForm}>
          <div className="border p-4 rounded-xl relative space-y-4">
            <p className="absolute bg-white -top-3 right-4 px-2">Hub Details</p>

            <div>
              <label>
                <span>Hub Name</span>
                <Input
                  name="name"
                  required
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
            </div>

            <div>
              <label>
                <span>Username</span>
                <Input
                  name="username"
                  required
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </label>
            </div>

            <div>
              <label>
                <span>Official Email</span>
                <Input
                  name=""
                  required
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
            </div>

            <div>
              <label>
                <span>Hub Address</span>
                <Input
                  name=""
                  required
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </label>
            </div>

            <div className="lg:flex items-center gap-3 space-y-3 lg:space-y-0">
              <div className="lg:w-6/12">
                <label>
                  <span>State</span>
                  <Input
                    name=""
                    required
                    type="text"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className="lg:w-6/12">
                <label>
                  <span>Official Phone Number</span>
                  <Input
                    name=""
                    required
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="lg:flex items-center gap-3 space-y-3 lg:space-y-0">
              <div className="lg:w-6/12">
                <label>
                  <span className="flex items-center gap-2">
                    <Icon icon="ri:twitter-x-fill" /> X Link
                  </span>
                  <Input
                    name=""
                    type="text"
                    value={twitter}
                    onChange={(e) => {
                      setTwitter(e.target.value);
                    }}
                  />
                </label>
              </div>

              <div className="lg:w-6/12">
                <label>
                  <span className="flex items-center gap-2">
                    <Icon icon="streamline:instagram" /> Instagram Link
                  </span>
                  <Input
                    name=""
                    type="text"
                    value={instagram}
                    onChange={(e) => {
                      setInstagram(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="lg:flex items-center gap-3 space-y-3 lg:space-y-0">
              <div className="lg:w-6/12">
                <label>
                  <span className="flex items-center gap-2">
                    <Icon icon="fluent-mdl2:website" /> Website
                  </span>
                  <Input
                    name=""
                    type="text"
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                  />
                </label>
              </div>

              <div className="lg:w-6/12">
                <label>
                  <span className="flex items-center gap-2">
                    <Icon icon="ic:sharp-tiktok" /> Tiktok Link
                  </span>
                  <Input
                    name=""
                    type="text"
                    value={tiktok}
                    onChange={(e) => {
                      setTiktok(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-xl relative space-y-4">
            <p className="absolute bg-white -top-3 right-4 px-2">About Hub</p>

            <div>
              <label>
                <span>Upload Images of Hub</span>
                <p className="text-[#fc045c] mb-4">
                  (*) Only accept images less than 1mb in size and up to 3 image
                  files
                </p>
                <Input
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleInputFiles}
                />
              </label>
              <p className="text-red-600 italic">{error}</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {images.map((image, index) => (
                <Photocard
                  key={index}
                  url={URL.createObjectURL(image)}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handlePreviewDelete(e, index);
                  }}
                />
              ))}
            </div>

            <div>
              <label>
                <span>Hub Description</span>
                <Textarea
                  placeholder="Tell us about your hub here..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </label>
            </div>

            <div>
              <p>Schedule</p>

              <div className="lg:flex items-center justify-between">
                <div className="flex gap-2 justify-center items-center flex-wrap lg:flex-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="flex rounded-md bg-black text-white py-1.5 px-2 items-center w-[125px]">
                        {dayOpen ? dayOpen : 'Day Open'}
                        <Icon icon="flowbite:chevron-sort-outline" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => {
                          setDayOpen('Monday');
                        }}
                      >
                        Monday
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setDayOpen('Tuesday');
                        }}
                      >
                        Tuesday
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setDayOpen('Wednesday');
                        }}
                      >
                        Wednesday
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setDayOpen('Thursday');
                        }}
                      >
                        Thursday
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setDayOpen('Friday');
                        }}
                      >
                        Friday
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setDayOpen('Saturday');
                        }}
                      >
                        Saturday
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          setDayOpen('Sunday');
                        }}
                      >
                        Sunday
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Input
                    name="open"
                    type="time"
                    value={openTime}
                    onChange={(e) => {
                      setOpenTime(e.target.value);
                    }}
                    className="w-fit"
                  />
                  <p>-</p>
                  <Input
                    name="close"
                    type="time"
                    value={closingTime}
                    onChange={(e) => {
                      setClosingTime(e.target.value);
                    }}
                    className="w-fit"
                  />

                  <Button onClick={handleAddSchedule}>+</Button>
                </div>
                <div>
                  {schedule.length > 0 && (
                    <ul className="bg-black flex flex-col items-center mt-3 rounded-lg text-white p-4">
                      {schedule.map((day, i) => (
                        <li key={i} className="my-2">
                          <div className="flex gap-2 text-base items-center">
                            <p className="pt-2 mr-2">{day}</p>
                            <Button
                              className="bg-white"
                              onClick={(e) => {
                                handleRemoveSchedule(e, i);
                              }}
                            >
                              <Icon
                                icon="iconamoon:trash-bold"
                                style={{ fontSize: '20px', color: 'black' }}
                              />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-xl relative space-y-4">
            <p className="absolute bg-white -top-3 right-4 px-2">
              Secure your account
            </p>
            <div className="lg:flex gap-3 lg:space-y-0 items-center space-y-3">
              <div className="lg:w-6/12">
                <label>
                  <span>Password</span>
                  <Input
                    name="password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
              <div className="lg:w-6/12">
                <label>
                  <span>Confirm Password</span>
                  <Input
                    name="confirm-password"
                    required
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center my-5">
            <LoadingButton />
          </div>
        </form>
      </Card>
    </main>
  );
};

export default Page;
