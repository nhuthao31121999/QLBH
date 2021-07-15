using OnlineShop.Entities.CommonEntitites;
using OnlineShop.Entities.Entities;
using OnlineShop.Entities.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using static OnlineShop.Common.OnlineShopConstants;

namespace OnlineShop.Data.Repositories
{
    public class SlideRepository : CommonRepository<SlideViewModel>
    {
        public List<SlideViewModel> GetAllSlides()
        {
            try
            {
                var result = ListByStoredProcedure(StoredProc.GetAllSlides);
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"GetAllSlides Failed: {e.Message}\n {e.StackTrace}");
                return new List<SlideViewModel>();
            }
        }

        public List<Slides> InsertSlides(Slides slide)
        {
            try
            {
                var result = ListByStoredProcedure<Slides>(StoredProc.InsertSlides,
                                      new StoredProcedureParameter("Image", slide.Image, DbType.String)
                                    , new StoredProcedureParameter("DisplayOrder", slide.DisplayOrder, DbType.Int32)
                                    , new StoredProcedureParameter("Status", slide.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("CreatedBy", slide.CreatedBy, DbType.String)
                                    , new StoredProcedureParameter("CreatedDate", slide.CreatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("LastUpdatedBy", slide.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", slide.LastUpdatedDate, DbType.DateTime)
                                    , new StoredProcedureParameter("IsDelete", slide.IsDelete, DbType.Boolean));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"InsertSlides Failed: {e.Message}\n {e.StackTrace}");
                return new List<Slides>();
            }
        }

        public List<Slides> UpdateSlides(Slides slide)
        {
            try
            {
                var result = ListByStoredProcedure<Slides>(StoredProc.UpdateSlides,
                                      new StoredProcedureParameter("SlideID", slide.SlideID, DbType.Int32)
                                    , new StoredProcedureParameter("Image", slide.Image, DbType.String)
                                    , new StoredProcedureParameter("DisplayOrder", slide.DisplayOrder, DbType.Int32)
                                    , new StoredProcedureParameter("Status", slide.Status, DbType.Boolean)
                                    , new StoredProcedureParameter("LastUpdatedBy", slide.LastUpdatedBy, DbType.String)
                                    , new StoredProcedureParameter("LastUpdatedDate", slide.LastUpdatedDate, DbType.DateTime));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"UpdateSlides Failed: {e.Message}\n {e.StackTrace}");
                return new List<Slides>();
            }
        }

        public List<Slides> DeleteSlides(Slides slide)
        {
            try
            {
                var result = ListByStoredProcedure<Slides>(StoredProc.DeleteSlides,
                                      new StoredProcedureParameter("SlideID", slide.SlideID, DbType.Int32));
                return result;
            }
            catch (Exception e)
            {
                _logger.Error($"DeleteSlides Failed: {e.Message}\n {e.StackTrace}");
                return new List<Slides>();
            }
        }
    }
}
