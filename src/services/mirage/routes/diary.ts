import dayjs from "dayjs";
import { Request, Response } from "miragejs";
import { Diary } from "../../../interfaces/diary.interface";
import { Entry } from "../../../interfaces/entry.interface";
import { User } from "../../../interfaces/user.interface";
import { handleErros } from "../server";

export const create = (
  schema: any,
  req: Request
): { user: User; diary: Diary } | Response => {
  try {
    const { title, type, userId } = JSON.parse(
      req.requestBody
    ) as Partial<Diary>;
    const exUser = schema.users.findBy({ id: userId });
    if (!exUser) {
      return handleErros(null, "No Such User Exists. ");
    }
    const now = dayjs().format();
    const diary = exUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
    });
    return {
      user: {
        ...exUser.attrs,
      },
      diary: diary.attrs,
    };
  } catch (error) {
    return handleErros(error, "Failed To Create Diary");
  }
};
export const updateDiary = (schema: any, req: Request): Diary | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Diary>;
    const now = dayjs().format();
    diary.update({
      ...data,
      updateAt: now,
    });
    return diary.attrs as Diary;
  } catch (error) {
    return handleErros(error, "Failed to Update Diary");
  }
};
export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
  try {
    const user = schema.users.find(req.params.id);
    return user.diary as Diary[];
  } catch (error) {
    return handleErros(null, "Could Not Get     user Diaries");
  }
};

//Methods for Working Diary Entries;

export const addEntry = (schema:any,req:Request) :{ diary:Diary;entry:Entry} | Response => {
    try {
        const diary = schema.diaries.find(req.params.id);;
        const { title,content } = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        const entry = diary.createEntry({
            title,
            content,
            createdAt:now,
            updateAt:now,
        })
        diary.update({
            ...diary.attrs,
            updateAt:now,
        });
        return {
            diary:diary.attrs,
            entry:entry.attrs,
        }
    }catch(error){
        return handleErros(error ,'Failed to save Entry' )
    }
};
export const getEntries = (schema:any,req:Request):{entries:Entry[] } | Response => {
    try{
        const diary = schema.diaries.find(req.params.id);
        return diary.entry;
    }catch(error){
        return handleErros(error , 'Failed To get Diary Entries')  
    }
}

export const upateEntry = (schema:any,req:Request) :Entry | Response => {
    try{
        const entry =   schema.entries.find(req.params.id);
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        entry.update({
            ...data,updateAt:now
        })
        
    return entry.attrs as Entry;
    }
    catch(error) {
        return handleErros(error,'Failed To Update Entry')
    }

}