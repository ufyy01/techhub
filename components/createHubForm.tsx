'use client';

import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import Photocard from '@/components/photocard';
import LoadingButton from '@/components/loadingButton';
import { uploadPhoto } from '@/app/actions/uploadActions';

const CreateForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [dayOpen, setDayOpen] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [schedule, setSchedule] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successfull, setSuccessfull] = useState('');

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

  images.map((image) => {
    formData.append(`images`, image);
  });

  const handleAddForm = async () => {
    const cloudImages = await uploadPhoto(formData);

    const hub = {
      name,
      email,
      twitter,
      instagram,
      tiktok,
      website,
      address,
      phone,
      state,
      description,
      schedule,
      notice,
      images: cloudImages.newPhotos,
    };

    if (cloudImages.msg === 'Upload successfull') {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/hub`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hub),
      });

      const data = await res.json();

      if (res.status === 200) {
        setName('');
        setEmail('');
        setTwitter('');
        setInstagram('');
        setTiktok('');
        setWebsite('');
        setAddress('');
        setPhone('');
        setState('');
        setDescription('');
        setImages([]);
        setSchedule([]);
        setNotice('');
        setError('');
        setErrorMessage('');
        setSuccessfull(data.message);
      } else {
        setErrorMessage(data.message);
      }
    }
  };

  return (
    <main className="m-4 lg:w-10/12 mx-auto">
      <Card className="p-7 mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl mb-2">Add Hub</h1>
          <p>Add your hub</p>
        </div>
        <form className="space-y-8" action={handleAddForm} ref={formRef}>
          <div className="border p-4 rounded-xl relative space-y-4 dark:border-white border-black">
            <p className="absolute bg-white dark:bg-black -top-3 right-4 px-2">
              Hub Details
            </p>

            <div>
              <label>
                <span>Hub Name</span>
                <Input
                  className="dark:border-white border-black"
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
                <span>Official Email</span>
                <Input
                  className="dark:border-white border-black"
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
                  className="dark:border-white border-black"
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
                    className="dark:border-white border-black"
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
                    className="dark:border-white border-black"
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
                    className="dark:border-white border-black"
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
                    className="dark:border-white border-black"
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
                    className="dark:border-white border-black"
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
                    className="dark:border-white border-black"
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

          <div className="border p-4 rounded-xl relative space-y-4 dark:border-white border-black">
            <p className="absolute bg-white dark:bg-black -top-7 right-4 px-2">
              About Hub
            </p>

            <div>
              <label>
                <span>Upload Images of Hub</span>
                <p className="text-[#fc045c] mb-4">
                  (*) Only accept images less than 1mb in size and up to 4 image
                  files
                </p>
                <Input
                  className="dark:border-white border-black"
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
                  className="dark:border-white border-black"
                  rows={5}
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

              <div className="items-center justify-between">
                <div className="flex gap-2 justify-center items-center flex-wrap lg:flex-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="flex rounded-md bg-black dark:bg-white dark:text-black text-white py-1.5 px-2 items-center w-[180px]">
                        {dayOpen ? dayOpen : 'Day Open'}
                        <Icon icon="flowbite:chevron-sort-outline" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dark:bg-white dark:text-black">
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
                    className="dark:border-white border-black w-fit"
                    name="open"
                    type="time"
                    value={openTime}
                    onChange={(e) => {
                      setOpenTime(e.target.value);
                    }}
                  />
                  <p>-</p>
                  <Input
                    className="dark:border-white border-black w-fit"
                    name="close"
                    type="time"
                    value={closingTime}
                    onChange={(e) => {
                      setClosingTime(e.target.value);
                    }}
                  />

                  <Button onClick={handleAddSchedule}>+</Button>
                </div>
                <div>
                  {schedule.length > 0 && (
                    <ul className="bg-black dark:bg-white dark:text-black flex flex-col items-center mt-3 rounded-lg text-white p-4">
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

            <div>
              <label>
                <span>Hub Notice</span>
                <Textarea
                  className="dark:border-white border-black"
                  rows={5}
                  placeholder="Pass important notice here..."
                  value={notice}
                  onChange={(e) => {
                    setNotice(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          {successfull && <p>{successfull}</p>}
          <div className="flex justify-center my-5">
            <LoadingButton />
          </div>
        </form>
      </Card>
    </main>
  );
};

export default CreateForm;
